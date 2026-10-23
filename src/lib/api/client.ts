// Centralized headless WordPress client.
// Products/content are read from the PUBLIC WooCommerce Store API (wc/store/v1)
// and the public WP REST API (wp/v2) — no consumer keys or auth required.
// Rank Math SEO metadata comes from its public headless endpoint
// (rankmath/v1/getHead, enabled on the live site).
// When WORDPRESS_API_URL is unset (static build / offline dev), callers fall
// back to the mock data in ../mock/data so the app still builds and renders.

const WP_REST = (process.env.WORDPRESS_API_URL || "").replace(/\/+$/, "");

export function isLiveApiConfigured(): boolean {
  return Boolean(WP_REST);
}

/** Absolute root of the WordPress site (no /wp-json), used for WP permalinks. */
export function wpSiteRoot(): string {
  return WP_REST ? WP_REST.replace(/\/wp-json.*$/, "") : "";
}

/** Public frontend deploy URL — used for canonicals, sitemap and robots. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://ayurrakshaonline.com").replace(/\/+$/, "");
}

type Json = Record<string, unknown>;

/**
 * GET a public REST path under WORDPRESS_API_URL.
 * @param path e.g. "wc/store/v1/products?per_page=100"
 * @param revalidate ISR seconds (server-only; ignored in the browser)
 * Returns null on any failure so callers can fall back gracefully.
 */
export async function fetchJson<T = Json>(path: string, revalidate = 3600): Promise<T | null> {
  if (!WP_REST) return null;
  const url = `${WP_REST}/${path.replace(/^\/+/, "")}`;
  try {
    const res = await fetch(url, {
      // `next.revalidate` gives ISR revalidation for these GETs; combining it
      // with `cache: "no-store"` is contradictory, so revalidate alone wins.
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error(`WP REST ${res.status} ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error("WP REST fetch error:", error);
    return null;
  }
}

/**
 * Fetch every page of a paginated REST collection (follows X-WP-TotalPages via
 * the `page` param). The first page is requested without reading headers, so
 * pagination is discovered by probing `page=2` and stopping when a page
 * returns an empty array.
 */
export async function fetchAllPages<T>(path: string, revalidate = 3600): Promise<T[]> {
  const first = await fetchPage<T>(path, revalidate);
  if (!first || first.data.length === 0) return [];
  const out: T[] = [...first.data];
  if (first.totalPages <= 1) return out;
  for (let p = 2; p <= Math.min(first.totalPages, 20); p++) {
    const sep = path.includes("?") ? "&" : "?";
    const res = await fetchPage<T>(`${path}${sep}page=${p}`, revalidate);
    if (!res || res.data.length === 0) break;
    out.push(...res.data);
  }
  return out;
}

/**
 * Fetch a single page of a REST collection with pagination headers
 * (X-WP-Total, X-WP-TotalPages). Returns { data, total, totalPages }.
 */
export async function fetchPage<T>(
  path: string,
  revalidate = 3600
): Promise<{ data: T[]; total: number; totalPages: number } | null> {
  if (!WP_REST) return null;
  const url = `${WP_REST}/${path.replace(/^\/+/, "")}`;
  try {
    const res = await fetch(url, {
      // `next.revalidate` gives ISR revalidation for these GETs; combining it
      // with `cache: "no-store"` is contradictory, so revalidate alone wins.
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error(`WP REST ${res.status} ${url}`);
      return null;
    }
    const data = (await res.json()) as T[];
    if (!Array.isArray(data)) return { data: [], total: 0, totalPages: 1 };
    const total = Number(res.headers.get("X-WP-Total")) || data.length;
    const totalPages =
      Number(res.headers.get("X-WP-TotalPages")) || Math.max(1, Math.ceil(total / Math.max(1, data.length)));
    return { data, total, totalPages };
  } catch (error) {
    console.error("WP REST page fetch error:", error);
    return null;
  }
}

/** Fetch a list of wp/v2 media items by ID in one request (public). */
export async function getFeaturedImages(ids: (number | string)[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const valid = ids.map(String).filter(Boolean);
  if (valid.length === 0) return map;
  const unique = valid.filter((v, i) => valid.indexOf(v) === i);
  const include = unique.join(",");
  const media = await fetchJson<
    Array<{ id: number | string; source_url?: string; meta?: { image_meta?: Array<{ source_url?: string }> } }>
  >(`wp/v2/media?include=${encodeURIComponent(include)}&per_page=100`, 3600);
  for (const m of media ?? []) {
    const url = m.source_url || m.meta?.image_meta?.[0]?.source_url;
    if (url) map.set(String(m.id), url);
  }
  return map;
}
