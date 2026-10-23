import { MOCK_BLOG_POSTS, BlogPost } from "../mock/data";
import { fetchJson, fetchPage, fetchAllPages, isLiveApiConfigured } from "./client";
import { WpPost, WpTerm } from "../types/wordpress";
import { stripHtml, readTime, sanitizeWpHtml, decodeEntities } from "../util/html";

// Live blog authors can 404 (a user was deleted), so author is a graceful
// brand fallback rather than a live user lookup.
const AUTHOR_FALLBACK = "Ayur Raksha Vaidya Council";

function formatWpDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function cleanTitle(rendered: string): string {
  return decodeEntities(stripHtml(rendered));
}

/** Resolve featured-media + taxonomy term embeds into the app's BlogPost shape. */
function toBlogPost(post: WpPost): BlogPost {
  const feat = post._embedded?.["wp:featuredmedia"]?.[0];
  const image =
    feat?.source_url ||
    feat?.media_details?.source_url ||
    (feat as { meta?: { image_meta?: Array<{ source_url?: string }> } } | undefined)?.meta?.image_meta?.[0]?.source_url ||
    "";

  const terms = (post._embedded?.["wp:term"] ?? []).flat() as WpTerm[];
  const category = terms.find((t) => t.slug === "blog")?.name || terms[0]?.name || "Ayurveda";

  const content = post.content?.rendered || "";
  const excerpt = cleanTitle(post.excerpt?.rendered || "").slice(0, 220) ||
    cleanTitle(content).slice(0, 220);

  return {
    id: String(post.id),
    title: cleanTitle(post.title.rendered),
    slug: post.slug,
    excerpt,
    content: sanitizeWpHtml(content),
    category,
    author: AUTHOR_FALLBACK,
    date: formatWpDate(post.date),
    readTime: readTime(content),
    image,
    // WordPress permalink — the key Rank Math stores this post's SEO under.
    link: post.link,
    // Rank Math SEO is pulled separately via the headless getHead endpoint.
    rankMath: undefined,
  };
}

/**
 * Latest N blog posts (default 12) for the home journal + static param
 * generation. Falls back to the mock list when the WP API is unavailable.
 */
export async function getBlogPosts(limit = 12): Promise<BlogPost[]> {
  if (isLiveApiConfigured()) {
    // NB: `_embed` and `_fields` conflict in WP REST — `_fields` strips the
    // `_embedded` payload — so we fetch the full post with the embeds.
    const res = await fetchPage<WpPost>(
      `wp/v2/posts?per_page=${limit}&_embed=wp:featuredmedia,wp:term`,
      3600
    );
    if (res && res.data.length > 0) return res.data.map(toBlogPost);
  }
  return MOCK_BLOG_POSTS;
}

export interface BlogListing {
  posts: BlogPost[];
  total: number;
  perPage: number;
  page: number;
  totalPages: number;
}

/**
 * Paginated blog listing with an optional category filter.
 * `total` is read from the X-WP-Total header (best-effort via the response).
 */
export async function getBlogListing(
  page = 1,
  perPage = 12,
  category?: string
): Promise<BlogListing> {
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
    _embed: "wp:featuredmedia,wp:term",
  });
  if (category) params.set("categories", category);

  if (!isLiveApiConfigured()) {
    const total = MOCK_BLOG_POSTS.length;
    const start = (page - 1) * perPage;
    return {
      posts: MOCK_BLOG_POSTS.slice(start, start + perPage),
      total,
      perPage,
      page,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    };
  }

  const res = await fetchPage<WpPost>(`wp/v2/posts?${params.toString()}`, 3600);
  if (!res) return { posts: [], total: 0, perPage, page, totalPages: 1 };
  return {
    posts: res.data.map(toBlogPost),
    total: res.total,
    perPage,
    page,
    totalPages: res.totalPages,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isLiveApiConfigured()) {
    const raw = await fetchJson<WpPost[]>(
      `wp/v2/posts?slug=${encodeURIComponent(slug)}&per_page=1&_embed=wp:featuredmedia,wp:term`,
      60
    );
    if (raw && raw.length > 0) return toBlogPost(raw[0]);
    // A 404/miss on the live API should not fall back to a mock post with the
    // same-looking slug; return null so the page renders notFound().
    return null;
  }
  const found = MOCK_BLOG_POSTS.find((b) => b.slug === slug);
  return found ?? MOCK_BLOG_POSTS[0] ?? null;
}

/** Up to `count` related posts (shares a category or keyword overlap). */
export async function getRelatedBlogPosts(slug: string, count = 3): Promise<BlogPost[]> {
  const current = await getBlogPostBySlug(slug);
  if (!current) return (await getBlogPosts(count)).slice(0, count);

  const all = await getBlogPosts(30);
  const others = all.filter((p) => p.slug !== slug);
  const byCategory = others.filter((p) => p.category === current.category);
  const related = byCategory.length >= count ? byCategory : [...byCategory, ...others].slice(0, count);
  return related.slice(0, count);
}

/** Blog category archives (public wp/v2/categories). */
export async function getBlogCategories(): Promise<WpTerm[]> {
  if (!isLiveApiConfigured()) return [];
  const raw = await fetchJson<WpTerm[]>(
    "wp/v2/categories?per_page=50&_fields=id,name,slug,count,description",
    3600
  );
  return (raw ?? []).filter((c) => c.count && c.count > 0);
}

/**
 * Latest N slugs only (no embeds) — for `generateStaticParams`, where a large
 * embedded payload would blow Next.js's 2MB ISR fetch-cache cap.
 */
export async function getRecentBlogSlugs(limit = 40): Promise<string[]> {
  if (!isLiveApiConfigured()) {
    return MOCK_BLOG_POSTS.slice(0, limit).map((p) => p.slug);
  }
  const raw = await fetchJson<
    Array<{ slug: string; status?: string }>
  >(`wp/v2/posts?per_page=${limit}&_fields=slug,status`, 3600);
  return (raw ?? []).filter((p) => p.status !== "draft").map((p) => p.slug);
}

export interface BlogSlugEntry {
  slug: string;
  lastModified?: Date;
}

/**
 * All published post slugs (+ dates for sitemap lastModified), capped.
 * No embeds needed here, so `_fields` is safe and keeps the payload small.
 */
export async function getAllBlogSlugs(cap = 500): Promise<BlogSlugEntry[]> {
  if (!isLiveApiConfigured()) {
    return MOCK_BLOG_POSTS.map((p) => ({ slug: p.slug }));
  }
  const raw = await fetchAllPages<WpPost>(
    `wp/v2/posts?per_page=100&_fields=slug,id,date,status`,
    3600
  );
  return raw
    .filter((p) => p.status === "publish")
    .slice(0, cap)
    .map((p) => ({
      slug: p.slug,
      lastModified: p.date ? new Date(p.date) : undefined,
    }));
}
