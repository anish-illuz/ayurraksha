import { fetchJson, isLiveApiConfigured } from "./client";
import { sanitizeWpHtml, stripHtml, decodeEntities } from "../util/html";

/** A WordPress page as managed content. */
export interface WpPage {
  id: number;
  slug: string;
  title: string;
  /** Sanitized HTML (Elementor/WP blocks stripped of scripts & handlers). */
  content: string;
  excerpt: string;
  link: string;
}

/**
 * Fetch a managed WordPress page by slug (public wp/v2/pages).
 * Returns null when unconfigured or not found — callers keep their curated
 * fallback content in that case.
 */
export async function getPageBySlug(slug: string, revalidate = 3600): Promise<WpPage | null> {
  if (!isLiveApiConfigured()) return null;
  const raw = await fetchJson<
    Array<{
      id: number;
      slug: string;
      link: string;
      status: string;
      title: { rendered: string; raw?: string };
      excerpt: { rendered: string };
      content: { rendered: string };
    }>
  >(`wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1`, revalidate);
  if (!raw || raw.length === 0 || raw[0].status !== "publish") return null;
  const p = raw[0];
  return {
    id: p.id,
    slug: p.slug,
    title: decodeEntities(stripHtml(p.title.rendered)),
    content: sanitizeWpHtml(p.content.rendered),
    excerpt: decodeEntities(stripHtml(p.excerpt.rendered || p.content.rendered)).slice(0, 220),
    link: p.link,
  };
}

/**
 * Policy / legal content lives in WordPress (shipping-policy,
 * refund_returns, terms-of-service, etc.). Fetch a few by slug at once.
 */
export async function getPolicyPages(
  slugs: string[]
): Promise<Record<string, WpPage | null>> {
  const out: Record<string, WpPage | null> = {};
  await Promise.all(
    slugs.map(async (s) => {
      out[s] = await getPageBySlug(s);
    })
  );
  return out;
}
