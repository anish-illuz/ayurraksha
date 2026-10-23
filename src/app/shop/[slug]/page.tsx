import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getFrequentlyBoughtTogether, getProducts } from "@/lib/api/products";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { RankMathJsonLd } from "@/components/seo/RankMathJsonLd";
import { ProductDetailView } from "./ProductDetailView";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};

  // Rank Math keys this product's SEO (incl. Product JSON-LD) by its WordPress
  // permalink; the canonical points to the frontend URL instead.
  return generateNextMetadata(
    `/shop/${product.slug}`,
    {
      title: `${product.name} | AyurRaksha`,
      description: product.short_description || product.description.substring(0, 160),
      ogImage: product.images[0]?.src,
    },
    product.permalink
  );
}

export async function generateStaticParams() {
  // Prerender the full catalog at build/ISR time; unknown slugs resolve on
  // demand via dynamicParams (new products can be added in the store anytime).
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Allow live slugs outside the static set (products added after the build).
export const dynamicParams = true;

// Refresh prerendered product data hourly; new products render on demand.
export const revalidate = 3600;

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const fbtProducts = await getFrequentlyBoughtTogether(product.slug);

  return (
    <>
      {/* Live Rank Math Product schema.org for this product */}
      <RankMathJsonLd url={product.permalink} />
      <ProductDetailView product={product} fbtProducts={fbtProducts} />
    </>
  );
}
