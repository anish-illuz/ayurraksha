"use client";

import React from "react";
import Image from "next/image";
import { Plus, ShoppingBag, Sparkles, Check } from "lucide-react";
import { Product } from "@/lib/types/woocommerce";
import { useCartStore } from "@/lib/store/cart";

interface FBTBundleShowcaseProps {
  products: Product[];
}

export const FBTBundleShowcase: React.FC<FBTBundleShowcaseProps> = ({ products }) => {
  const addBundle = useCartStore((state) => state.addBundle);

  // Take first 3 products for bundle
  const bundleItems = products.slice(0, 3);
  const totalPrice = bundleItems.reduce((acc, item) => acc + item.price, 0);
  const regularTotal = bundleItems.reduce((acc, item) => acc + item.regular_price, 0);
  const savings = regularTotal - totalPrice;

  if (bundleItems.length < 2) return null;

  return (
    <section className="py-16 bg-ayur-cream border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ayur-border shadow-card">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ayur-forest mb-1">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            <span>Synergistic Ayurvedic Bundle</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-ayur-slate mb-2">
            Complete Daily Ayurvedic Renewal Trio
          </h2>
          <p className="text-xs sm:text-sm text-ayur-muted mb-8 max-w-xl">
            Combine Triphala (gut cleansing), KSM-66 Ashwagandha (stress relief), and Joint Guard for holistic Tridoshic equilibrium.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Bundle Items Visual Row */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {bundleItems.map((prod, idx) => (
                <React.Fragment key={prod.id}>
                  <div className="flex-1 w-full p-4 rounded-2xl bg-ayur-cream border border-ayur-border text-center flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white mb-3 shadow-soft">
                      <Image
                        src={
                          prod.images[0]?.src ||
                          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80"
                        }
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs font-bold text-ayur-slate line-clamp-1">{prod.name}</div>
                    <div className="text-xs font-extrabold text-ayur-forest mt-1">₹{prod.price}</div>
                  </div>

                  {idx < bundleItems.length - 1 && (
                    <div className="w-8 h-8 rounded-full bg-ayur-stone text-ayur-forest flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Total Summary & Add All to Cart */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-ayur-stone border border-ayur-border flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-ayur-forest">
                  Bundle Pricing
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3xl font-extrabold text-ayur-forest">
                    ₹{totalPrice}
                  </span>
                  <span className="text-sm text-ayur-muted line-through">₹{regularTotal}</span>
                </div>
                {savings > 0 && (
                  <div className="inline-block mt-2 bg-ayur-terracotta text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    SAVE ₹{savings} (Extra 15% OFF)
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-ayur-slate font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-ayur-forest" /> Free Express Pan-India Delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-ayur-forest" /> Doctor Consultation Advice Included
                </div>
              </div>

              <button
                onClick={() => addBundle(bundleItems)}
                className="w-full bg-ayur-forest text-white py-3.5 rounded-ayur font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep transition-all shadow-card"
              >
                <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                <span>Add All 3 Items To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
