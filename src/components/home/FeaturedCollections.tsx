"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types/woocommerce";
import { ProductCard } from "../product/ProductCard";

interface FeaturedCollectionsProps {
  products: Product[];
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Formulations" },
    { id: "digestion", label: "Digestion & Gut" },
    { id: "immunity", label: "Immunity" },
    { id: "stress", label: "Stress & Sleep" },
    { id: "vitality", label: "Vitality" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "digestion") return p.slug.includes("triphala") || p.acf?.health_concerns?.includes("Digestion & Gut Health");
    if (activeTab === "immunity") return p.slug.includes("chyawanprash") || p.acf?.health_concerns?.includes("Immunity & Protection");
    if (activeTab === "stress") return p.slug.includes("ashwagandha") || p.acf?.health_concerns?.includes("Stress & Sleep");
    if (activeTab === "vitality") return p.slug.includes("shilajit") || p.acf?.health_concerns?.includes("Men's Vitality");
    return true;
  });

  return (
    <section className="py-16 bg-ayur-cream border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
            Curated Formulations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate">
            Explore By Remedy Category
          </h2>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-ayur-forest text-white shadow-soft"
                  : "bg-white text-ayur-slate hover:bg-ayur-stone border border-ayur-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
