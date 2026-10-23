import { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/products";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { siteUrl } from "@/lib/api/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl();
  const now = new Date();
  const products = await getProducts();
  const blogSlugs = await getAllBlogSlugs();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: now, // Store API exposes no product date; build-time is safe
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogUrls = blogSlugs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.lastModified ?? now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/health-concerns`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...productUrls,
    ...blogUrls,
  ];
}
