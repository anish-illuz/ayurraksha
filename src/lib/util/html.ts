// Small, safe HTML helpers for headless WordPress content.
// We render WP post HTML with dangerouslySetInnerHTML in a few places; these
// helpers strip anything that could execute or exfiltrate while preserving
// the intended typography (headings, lists, links, images).

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeEntities(input: string): string {
  return input
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Remove executable/unsafe markup from a WordPress content string. */
export function sanitizeWpHtml(html: string): string {
  return html
    .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*style[\s\S]*?<\s*\/\s*style\s*>/gi, "")
    // inline event handlers
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // javascript: URLs
    .replace(/(href|src)\s*=\s*("|')?\s*javascript:[^"'>\s]+("|')?/gi, '$1=$2#$3');
}

/** Approximate reading time for an HTML article (~220 wpm). */
export function readTime(html: string): string {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
