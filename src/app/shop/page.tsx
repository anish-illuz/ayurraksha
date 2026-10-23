import React from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import { getCategories, getHealthConcerns } from "@/lib/api/categories";
import { ShopView } from "./ShopView";
import { generateNextMetadata } from "@/lib/api/rankmath";

export async function generateMetadata(): Promise<Metadata> {
  // Rank Math maintains the /shop/ archive SEO; canonicalize to the frontend.
  return generateNextMetadata(
    "/shop",
    {
      title: "Shop Ayurvedic Formulations & Remedies | AyurRaksha",
      description:
        "Browse 100% organic doctor-formulated Ayurvedic capsules, classical Avalehas, Tailams, and Shilajit.",
    },
    "/shop/"
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams?.category === "string" ? searchParams.category : undefined;
  const healthConcern = typeof searchParams?.healthConcern === "string" ? searchParams.healthConcern : undefined;
  const sortBy = typeof searchParams?.sortBy === "string" ? (searchParams.sortBy as any) : undefined;
  const search = typeof searchParams?.search === "string" ? searchParams.search : undefined;

  const products = await getProducts({ category, healthConcern, sortBy, search });
  const categories = await getCategories();
  const healthConcerns = await getHealthConcerns();

  return (
    <ShopView
      initialProducts={products}
      categories={categories}
      healthConcerns={healthConcerns}
      currentCategory={category}
      currentHealthConcern={healthConcern}
      currentSort={sortBy}
      searchQuery={search}
    />
  );
}
