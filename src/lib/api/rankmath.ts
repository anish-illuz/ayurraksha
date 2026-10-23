import { Metadata } from "next";
import { fetchJson, wpSiteRoot, siteUrl, isLiveApiConfigured } from "./client";
import { RankMathMetadata } from "../types/rankmath";
import { decodeEntities, stripHtml } from "../util/html";

// ── Rank Math headless endpoint ─────────────────────────────────────────────
// The live site has Rank Math's "headless_support" enabled, which registers the
// public route: GET /wp-json/rankmath/v1/getHead?url=<absolute URL>
// It returns { success: true, head: "<title>…</title><meta …/>…<script type=\"application/ld+json\">…" }
// We parse that <head> fragment into structured metadata so the Next.js app can
// render real Rank Math SEO without scraping the HTML.

export interface ParsedHead {
  title?: string;
  description?: string;
  robots?: string;
  canonical?: string;
  ogImage?: string;
  /** All JSON-LD blocks, already parsed into objects when possible. */
  jsonLd: unknown[];
  /** Raw <head> HTML, for any consumer that wants it verbatim. */
  raw?: string;
}

function unescape(s: string): string {
  return decodeEntities(s);
}

function matchAttr(input: string, key: string): string | undefined {
  // matches  key="value"  |  key='value'  |  key=value
  const re = new RegExp(
    `[\\s\\[>]?${key}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i"
  );
  const m = input.match(re);
  if (!m) return undefined;
  return unescape(m[2] ?? m[3] ?? m[4] ?? "");
}

/**
 * Parse a Rank Math / generic <head> fragment into structured metadata.
 * Handles: <title>, meta[name=description|robots], link[rel=canonical],
 * meta[property^=og:], meta[name^=twitter:], and application/ld+json scripts.
 */
export function parseHead(head: string): ParsedHead {
  const out: ParsedHead = { jsonLd: [] };
  if (!head) return out;

  const titleM = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleM) out.title = unescape(stripHtml(titleM[1]));

  const descM = head.match(/<meta[^>]+name=["']description["'][^>]*>/i) ||
    head.match(/<meta[^>]+content=(["'][\s\S]*?["'])[^>]*name=["']description["'][^>]*>/i);
  if (descM) out.description = matchAttr(descM[0], "content");

  const robotsM = head.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
  if (robotsM) out.robots = matchAttr(robotsM[0], "content");

  const canonM = head.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (canonM) out.canonical = matchAttr(canonM[0], "href");

  const ogImageM = head.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  if (ogImageM) out.ogImage = matchAttr(ogImageM[0], "content");

  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jm: RegExpExecArray | null;
  while ((jm = jsonLdRegex.exec(head)) !== null) {
    try {
      const parsed = JSON.parse(jm[1]);
      out.jsonLd.push(parsed);
    } catch {
      out.jsonLd.push(jm[1]);
    }
  }

  out.raw = head;
  return out;
}

/**
 * Fetch + parse Rank Math SEO for a page.
 * @param permalink The WordPress URL (absolute, or a path like "/shop/triphala")
 *                  Rank Math keys off. If a WP root is configured it is prefixed;
 *                  otherwise a relative path is resolved against it.
 */
export async function getRankMathHead(permalink: string, revalidate = 3600): Promise<ParsedHead | null> {
  if (!isLiveApiConfigured() && !wpSiteRoot()) return null;
  const base = wpSiteRoot() || siteUrl();
  const target = permalink.startsWith("http") ? permalink : `${base}${permalink}`;
  const raw = await fetchJson<{ success: boolean; head: string }>(
    `rankmath/v1/getHead?url=${encodeURIComponent(target)}`,
    revalidate
  );
  if (!raw || !raw.success) return null;
  return parseHead(raw.head);
}

// ── Next.js metadata helpers ────────────────────────────────────────────────

/** Shape of Rank Math SEO data passed to generateMetadata from a live fetch. */
export type SeoData = {
  title?: string;
  description?: string;
  robots?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: unknown[];
};

export type SeoOverrides = {
  title?: string;
  description?: string;
  ogImage?: string;
};

/**
 * Build Next.js Metadata from Rank Math values, with the canonical overridden
 * to the public frontend domain. Falls back to sensible brand defaults when a
 * value is missing so every page always has title + description + canonical.
 *
 * Rank Math keys its data by the WORDPRESS URL, while this app is served from
 * the FRONTEND domain — so the two URLs are kept distinct:
 *   canonicalPath → what to index/canonicalize to (frontend path, e.g. "/blog/xyz")
 *   wpLookupUrl   → what Rank Math stores the SEO for (WP permalink, e.g. "/xyz/")
 *
 * @param canonicalPath Frontend path of THIS page (used for the canonical URL).
 * @param overrides Page-supplied title/description/ogImage, used when the
 *                   Rank Math fetch is unavailable or the value is missing.
 * @param wpLookupUrl WP-side URL to query Rank Math with. Defaults to
 *                    canonicalPath (works for the homepage; content pages
 *                    should pass their real WP permalink, e.g. "/migro-prime-tablets/").
 */
export async function generateNextMetadata(
  canonicalPath?: string,
  overrides: SeoOverrides = {},
  wpLookupUrl?: string
): Promise<Metadata> {
  const site = siteUrl();
  const path = canonicalPath || "/";
  const canonical = `${site}${path === "/" ? "/" : path}`;
  const brandTitle = "Ayur Raksha";
  const lookup = wpLookupUrl || path;

  let rm: ParsedHead | null = null;
  try {
    rm = await getRankMathHead(lookup, 3600);
  } catch {
    rm = null;
  }

  // Rank Math reports "Page not found" for URLs with no WP counterpart
  // (frontend-only routes like /contact, /quiz). In that case the fetched head
  // is a generic 404, not real SEO — discard it so the curated fallback wins.
  if (rm && /page not found/i.test(rm.title || "")) {
    rm = null;
  }

  // WordPress (Rank Math) is the source of truth: its live values win; the
  // hardcoded overrides are fallbacks only, so content edits in WP propagate.
  const title = rm?.title || overrides.title || `${brandTitle} | Ayurvedic Wellness`;
  const description =
    rm?.description || overrides.description || "Doctor-formulated Ayurvedic supplements & remedies.";
  const ogImage = overrides.ogImage || rm?.ogImage;

  // Map Rank Math's robots meta into Next.js's RobotsData. index/follow are
  // "yes"/"no" strings; no* directives are boolean; anything non-standard
  // (max-snippet, etc.) goes into otherDirectives, which Next emits verbatim.
  let robots: Metadata["robots"];
  if (rm?.robots) {
    const directives = rm.robots
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    interface RobotKnown {
      index?: boolean;
      follow?: boolean;
      noimageindex?: boolean;
      noscript?: boolean;
      noarchive?: boolean;
      nosnippet?: boolean;
    }
    const known: RobotKnown = {};
    const other: string[] = [];
    for (const d of directives) {
      const [key, val] = d.split(":").map((s) => s.trim());
      const isNo = val === "no";
      const isYes = val === "yes";
      switch (key) {
        case "index":
          // Rank Math emits "index" / "noindex"; Next.js uses a boolean.
          known.index = !isNo;
          break;
        case "follow":
          known.follow = !isNo;
          break;
        case "noimageindex":
          known.noimageindex = isYes || val === undefined;
          break;
        case "noscript":
          known.noscript = isYes || val === undefined;
          break;
        case "noarchive":
          known.noarchive = isYes || val === undefined;
          break;
        case "nosnippet":
          known.nosnippet = isYes || val === undefined;
          break;
        case "none":
          other.push("none");
          break;
        default:
          other.push(d);
      }
    }
    robots = {
      ...known,
      ...(other.length ? { otherDirectives: other } : undefined),
    };
  }

  const metadata: Metadata = {
    title,
    description,
    // Use the parsed robots; default to indexable + follow when Rank Math
    // didn't provide any.
    robots: robots ?? { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brandTitle,
      locale: "en_US",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    metadataBase: new URL(site),
  };

  // Surface any Rank Math JSON-LD (schema.org) so it lands in the <head>.
  if (rm?.jsonLd && rm.jsonLd.length > 0) {
    (metadata as unknown as { jsonLd?: unknown }).jsonLd = rm.jsonLd;
  }

  return metadata;
}

/**
 * Inject Rank Math JSON-LD (schema.org) into the document.
 * Returns a string of <script> tags safe to dangerouslySetInnerHTML in <head>.
 * Empty string when there is nothing to render.
 */
export function jsonLdToScripts(jsonLd: unknown[] | undefined): string {
  if (!jsonLd || jsonLd.length === 0) return "";
  return jsonLd
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join("");
}

/** Convenience: parse into the legacy RankMathMetadata type used by mock data. */
export function parsedHeadToRankMath(head: ParsedHead | null): RankMathMetadata {
  return {
    title: head?.title,
    description: head?.description,
    canonical: head?.canonical,
    openGraph: head?.ogImage ? { image: head.ogImage } : undefined,
    schema: head?.jsonLd?.length ? (head.jsonLd[0] as Record<string, unknown>) : undefined,
  };
}
