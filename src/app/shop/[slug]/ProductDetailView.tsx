"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Clock,
  ChevronDown,
  User,
  Zap,
} from "lucide-react";
import { Product } from "@/lib/types/woocommerce";
import { RatingStars } from "@/components/product/RatingStars";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { hasACFData } from "@/lib/api/acf";

interface ProductDetailViewProps {
  product: Product;
  fbtProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  fbtProducts,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "ingredients" | "usage" | "precautions">(
    "benefits"
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const addItem = useCartStore((state) => state.addItem);
  const addBundle = useCartStore((state) => state.addBundle);
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlistIds.includes(String(product.id));

  const acf = product.acf;
  const badges = acf?.product_badges || (product.featured ? ["Bestseller", "100% Organic"] : ["100% Organic"]);

  // Calculate FBT bundle pricing
  const fbtTotalPrice = fbtProducts.reduce((acc, p) => acc + p.price, 0);
  const fbtRegularTotal = fbtProducts.reduce((acc, p) => acc + p.regular_price, 0);

  return (
    <div className="bg-ayur-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SECTION 1 — PRODUCT HERO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ayur-border shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-ayur-stone border border-ayur-border">
              <Image
                src={
                  product.images[selectedImageIndex]?.src ||
                  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="bg-ayur-forest text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-ayur-stone border-2 transition-all ${
                      selectedImageIndex === idx ? "border-ayur-forest ring-2 ring-ayur-forest/20" : "border-ayur-border"
                    }`}
                  >
                    <Image src={img.src} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchase Actions Column */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Star Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                  {product.categories[0]?.name || "Ayurvedic Medicine"}
                </span>
                <RatingStars rating={product.average_rating} count={product.rating_count} size={16} />
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-ayur-slate">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-ayur-muted leading-relaxed">
                {product.short_description || acf?.short_description}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-3xl font-extrabold text-ayur-forest">
                  ₹{product.price}
                </span>
                {product.on_sale && (
                  <>
                    <span className="text-sm text-ayur-muted line-through">₹{product.regular_price}</span>
                    <span className="bg-ayur-terracotta/10 text-ayur-terracotta text-xs font-bold px-2.5 py-0.5 rounded-full">
                      SAVE ₹{product.regular_price - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Dosha Balance Pill (ACF) */}
              {acf?.ayurvedic_properties?.dosha_balance && (
                <div className="p-3 rounded-xl bg-ayur-stone/70 border border-ayur-border text-xs text-ayur-slate flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-ayur-gold shrink-0" />
                  <span>
                    <strong className="font-bold">Ayurvedic Profile:</strong> {acf.ayurvedic_properties.dosha_balance}
                  </span>
                </div>
              )}

              {/* Stock Status */}
              <div className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>In Stock & Ready for Express Dispatch</span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="flex items-center border border-ayur-border rounded-xl bg-ayur-cream p-1 w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-ayur-slate hover:text-ayur-forest"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-ayur-slate">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-ayur-slate hover:text-ayur-forest"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => addItem(product, quantity)}
                  className="w-full sm:flex-1 bg-ayur-forest text-white py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-card transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-white border-ayur-border text-ayur-slate hover:bg-ayur-stone"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Delivery & Trust Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-ayur-border text-[11px] text-ayur-slate font-medium text-center">
              <div className="p-2 rounded-lg bg-ayur-cream flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-ayur-forest" />
                <span>Free Shipping {">"} ₹999</span>
              </div>
              <div className="p-2 rounded-lg bg-ayur-cream flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-ayur-forest" />
                <span>NABL Lab Tested</span>
              </div>
              <div className="p-2 rounded-lg bg-ayur-cream flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-ayur-forest" />
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — KEY BENEFITS (ACF) */}
        {hasACFData(acf, "key_benefits") && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-soft space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Clinical Action
              </span>
              <h2 className="font-serif text-2xl font-extrabold text-ayur-slate mt-1">
                Key Health Benefits
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {acf?.key_benefits?.map((benefit, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-ayur-cream border border-ayur-border flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-ayur-lightLeaf text-ayur-forest flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-ayur-slate">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3 & 4 — INGREDIENTS & AYURVEDIC PROPERTIES (ACF) */}
        {hasACFData(acf, "ingredients") && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-soft space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Botanical Profile
              </span>
              <h2 className="font-serif text-2xl font-extrabold text-ayur-slate mt-1">
                Active Botanical Ingredients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {acf?.ingredients?.map((ing, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-ayur-stone border border-ayur-border space-y-2">
                  {ing.ayurvedic_role && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ayur-forest bg-white px-2 py-0.5 rounded border border-ayur-border">
                      {ing.ayurvedic_role}
                    </span>
                  )}
                  <h4 className="font-serif text-base font-bold text-ayur-slate">{ing.name}</h4>
                  {ing.description && (
                    <p className="text-xs text-ayur-muted leading-relaxed">{ing.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5 & 6 — HOW TO USE & SUITABILITY (ACF) */}
        {hasACFData(acf, "how_to_use") && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ayur-slate flex items-center gap-2">
                <Clock className="w-5 h-5 text-ayur-forest" /> Dosage & How To Use
              </h3>
              <p className="text-xs sm:text-sm text-ayur-slate leading-relaxed bg-ayur-cream p-4 rounded-2xl border border-ayur-border">
                {acf?.how_to_use}
              </p>
              {acf?.dosage && (
                <div className="text-xs font-semibold text-ayur-forest">
                  Recommended Dosage: {acf.dosage}
                </div>
              )}
            </div>

            {hasACFData(acf, "suitable_for") && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ayur-slate flex items-center gap-2">
                  <User className="w-5 h-5 text-ayur-forest" /> Who Is This Remedy For?
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-ayur-slate">
                  {acf?.suitable_for?.map((sf, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-ayur-forest shrink-0" />
                      <span>{sf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SECTION 10 — FREQUENTLY BOUGHT TOGETHER (FBT) BUNDLE */}
        {fbtProducts.length > 1 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-card space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Synergistic Combination
              </span>
              <h2 className="font-serif text-2xl font-extrabold text-ayur-slate mt-1">
                Frequently Bought Together
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                {fbtProducts.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <div className="flex-1 w-full p-4 rounded-2xl bg-ayur-cream border border-ayur-border text-center flex flex-col items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white mb-2 shadow-soft">
                        <Image src={p.images[0]?.src || ""} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="text-xs font-bold text-ayur-slate line-clamp-1">{p.name}</div>
                      <div className="text-xs font-bold text-ayur-forest mt-1">₹{p.price}</div>
                    </div>
                    {idx < fbtProducts.length - 1 && (
                      <div className="w-7 h-7 rounded-full bg-ayur-stone text-ayur-forest flex items-center justify-center shrink-0 font-bold text-xs">
                        +
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-ayur-stone border border-ayur-border space-y-3">
                <div className="text-xs text-ayur-muted font-medium">Combined Price:</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-ayur-forest">₹{fbtTotalPrice}</span>
                  <span className="text-xs text-ayur-muted line-through">₹{fbtRegularTotal}</span>
                </div>
                <button
                  onClick={() => addBundle(fbtProducts)}
                  className="w-full bg-ayur-forest text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-soft"
                >
                  <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                  <span>Add Bundle To Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8 — REVIEWS */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Verified Feedback
              </span>
              <h2 className="font-serif text-2xl font-extrabold text-ayur-slate mt-1">
                Customer & Doctor Reviews ({product.rating_count || 1})
              </h2>
            </div>
            <RatingStars rating={product.average_rating} count={product.rating_count} size={18} />
          </div>

          <div className="space-y-4 divide-y divide-ayur-border">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-serif text-sm font-bold text-ayur-slate flex items-center gap-1.5">
                      <span>{rev.reviewer}</span>
                      {rev.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle2 className="w-3.5 h-3.5 text-ayur-forest" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-ayur-muted">{rev.date_created}</span>
                  </div>
                  <RatingStars rating={rev.rating} />
                  <p className="text-xs sm:text-sm text-ayur-slate leading-relaxed">{rev.review}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-ayur-muted italic">
                Be the first verified customer to leave a review for {product.name}.
              </p>
            )}
          </div>
        </div>

        {/* SECTION 9 — PRODUCT FAQS (ACF) */}
        {hasACFData(acf, "faqs") && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ayur-border shadow-soft space-y-6">
            <h2 className="font-serif text-2xl font-extrabold text-ayur-slate">
              Product Specific FAQs
            </h2>
            <div className="space-y-3">
              {acf?.faqs?.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-ayur-border rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-serif text-sm font-bold text-ayur-slate flex items-center justify-between gap-4 bg-ayur-cream"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs text-ayur-muted leading-relaxed bg-white border-t border-ayur-border">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
