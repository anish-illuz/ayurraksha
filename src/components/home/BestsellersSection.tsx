import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types/woocommerce";
import { ProductCard } from "../product/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

interface BestsellersSectionProps {
  products: Product[];
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({ products }) => {
  return (
    <section className="py-16 bg-white border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ayur-forest mb-1">
              <Sparkles className="w-4 h-4 text-ayur-gold" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate">
              AyurRaksha Bestselling Formulations
            </h2>
            <p className="text-sm text-ayur-muted mt-1 max-w-xl">
              Trusted by over 25,000+ practitioners and patients across India for consistent therapeutic results.
            </p>
          </div>

          <Link
            href="/shop?sortBy=popularity"
            className="text-xs font-bold text-ayur-forest hover:text-ayur-deep flex items-center gap-1 group"
          >
            <span>Explore All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid with Mobile Horizontal Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
