"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, ArrowUpDown, Sparkles, Check } from "lucide-react";
import { Product, ProductCategory } from "@/lib/types/woocommerce";
import { ProductCard } from "@/components/product/ProductCard";

interface ShopViewProps {
  initialProducts: Product[];
  categories: ProductCategory[];
  healthConcerns: any[];
  currentCategory?: string;
  currentHealthConcern?: string;
  currentSort?: string;
  searchQuery?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialProducts,
  categories,
  healthConcerns,
  currentCategory,
  currentHealthConcern,
  currentSort = "popularity",
  searchQuery,
}) => {
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = initialProducts.filter((p) => {
    if (inStockOnly && p.stock_status !== "instock") return false;
    return true;
  });

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sortBy", newSort);
    router.push(`/shop?${params.toString()}`);
  };

  const handleCategorySelect = (slug?: string) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleHealthConcernSelect = (name?: string) => {
    const params = new URLSearchParams(window.location.search);
    if (name) {
      params.set("healthConcern", name);
    } else {
      params.delete("healthConcern");
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
  };

  return (
    <div className="bg-ayur-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="mb-8 border-b border-ayur-border pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ayur-forest mb-1">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            <span>AyurRaksha Apothecary</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-ayur-slate">
            {currentCategory
              ? categories.find((c) => c.slug === currentCategory)?.name || "Category Products"
              : currentHealthConcern
              ? `Remedies for ${currentHealthConcern}`
              : searchQuery
              ? `Search Results for "${searchQuery}"`
              : "All Ayurvedic Formulations"}
          </h1>
          <p className="text-xs sm:text-sm text-ayur-muted mt-1 max-w-2xl">
            Explore 100% organic, lab-certified botanical extracts prepared according to classical Vedic text specifications.
          </p>

          {/* Active Filter Pills */}
          {(currentCategory || currentHealthConcern || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-ayur-border/40">
              <span className="text-xs font-bold text-ayur-slate">Active Filters:</span>
              {currentCategory && (
                <span className="inline-flex items-center gap-1 bg-ayur-forest text-white text-xs px-3 py-1 rounded-full">
                  Category: {currentCategory}
                  <button onClick={() => handleCategorySelect(undefined)} className="hover:text-ayur-gold">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {currentHealthConcern && (
                <span className="inline-flex items-center gap-1 bg-ayur-forest text-white text-xs px-3 py-1 rounded-full">
                  Concern: {currentHealthConcern}
                  <button onClick={() => handleHealthConcernSelect(undefined)} className="hover:text-ayur-gold">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-ayur-terracotta hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toolbar (Filter & Sort Buttons) */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-3 rounded-ayur border border-ayur-border shadow-soft">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex-1 bg-ayur-stone text-ayur-forest py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Remedies</span>
          </button>

          <div className="flex-1 flex items-center justify-end gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-ayur-muted" />
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-ayur-slate focus:outline-none"
            >
              <option value="popularity">Bestselling</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-white p-6 rounded-2xl border border-ayur-border shadow-soft">
            <div className="flex items-center justify-between border-b border-ayur-border pb-3">
              <h3 className="font-serif text-base font-bold text-ayur-slate flex items-center gap-2">
                <Filter className="w-4 h-4 text-ayur-forest" /> Filter Remedies
              </h3>
              {(currentCategory || currentHealthConcern) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-ayur-terracotta hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* In-Stock Toggle */}
            <div className="flex items-center justify-between text-xs font-medium text-ayur-slate pb-4 border-b border-ayur-border">
              <span>In Stock Only</span>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  inStockOnly ? "bg-ayur-forest" : "bg-ayur-border"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                    inStockOnly ? "translate-x-5.5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Categories
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => handleCategorySelect(undefined)}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                    !currentCategory ? "bg-ayur-stone font-bold text-ayur-forest" : "text-ayur-slate hover:bg-ayur-cream"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors flex justify-between items-center ${
                      currentCategory === cat.slug
                        ? "bg-ayur-stone font-bold text-ayur-forest"
                        : "text-ayur-slate hover:bg-ayur-cream"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.count !== undefined && (
                      <span className="text-[10px] text-ayur-muted">({cat.count})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Concerns */}
            <div className="space-y-2 pt-4 border-t border-ayur-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Health Concerns
              </h4>
              <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
                {healthConcerns.map((hc) => (
                  <button
                    key={hc.id}
                    onClick={() =>
                      handleHealthConcernSelect(
                        currentHealthConcern === hc.name ? undefined : hc.name
                      )
                    }
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                      currentHealthConcern === hc.name
                        ? "bg-ayur-stone font-bold text-ayur-forest"
                        : "text-ayur-slate hover:bg-ayur-cream"
                    }`}
                  >
                    <span>{hc.name}</span>
                    {currentHealthConcern === hc.name && (
                      <Check className="w-3.5 h-3.5 text-ayur-forest" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Grid Column */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar (Sort & Count Summary) */}
            <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl border border-ayur-border shadow-soft">
              <div className="text-xs font-semibold text-ayur-slate">
                Showing <strong className="text-ayur-forest font-bold">{filteredProducts.length}</strong> formulations
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-ayur-muted font-medium">Sort By:</span>
                <select
                  value={currentSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-ayur-cream border border-ayur-border text-ayur-slate font-bold text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-ayur-forest"
                >
                  <option value="popularity">Bestselling</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-ayur-border space-y-3">
                <p className="font-serif text-lg font-bold text-ayur-slate">
                  No formulations found matching your filters.
                </p>
                <p className="text-xs text-ayur-muted max-w-sm mx-auto">
                  Try clearing active category or health concern filters to view all remedies.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 bg-ayur-forest text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-ayur-deep"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
