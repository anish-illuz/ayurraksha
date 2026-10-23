import React from "react";
import { getRankMathHead, jsonLdToScripts } from "@/lib/api/rankmath";

/**
 * Server component that injects Rank Math's JSON-LD (schema.org) for a page.
 * Google accepts JSON-LD in <head> or <body>; we render it into the body to
 * keep the head free of server-injected scripts.
 *
 * @param url The WordPress URL Rank Math stores this page's SEO under —
 *            a post/product permalink or an archive path like "/shop/".
 *            When unset (no live API / no URL), nothing is rendered.
 */
export async function RankMathJsonLd({
  url,
  revalidate = 3600,
}: {
  url?: string;
  revalidate?: number;
}) {
  if (!url) return null;
  let head: Awaited<ReturnType<typeof getRankMathHead>> = null;
  try {
    head = await getRankMathHead(url, revalidate);
  } catch {
    head = null;
  }
  const scripts = jsonLdToScripts(head?.jsonLd);
  if (!scripts) return null;
  // JSON-LD only — safe to inject (Rank Math's parser already stripped
  // executable content and we only ever emit the parsed ld+json blocks).
  return <div dangerouslySetInnerHTML={{ __html: scripts }} />;
}
