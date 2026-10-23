"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, CheckCircle2 } from "lucide-react";
import { Product } from "@/lib/types/woocommerce";
import { RatingStars } from "./RatingStars";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlistIds.includes(String(product.id));

  const badges = product.acf?.product_badges || (product.featured ? ["Bestseller"] : []);

  return (
    <div className="group bg-white rounded-ayur border border-ayur-border hover:border-ayur-forest/40 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-square bg-ayur-stone overflow-hidden">
        <Image
          src={
            product.images[0]?.src ||
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
          }
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="bg-ayur-forest/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm"
            >
              {badge}
            </span>
          ))}
          {product.on_sale && (
            <span className="bg-ayur-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              SAVE ₹{product.regular_price - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? "bg-red-50 text-red-500"
              : "bg-white/80 text-ayur-slate hover:bg-white hover:text-red-500"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Link */}
        <Link
          href={`/shop/${product.slug}`}
          className="absolute inset-0 z-0"
          aria-label={product.name}
        />
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Ratings */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase text-ayur-forest">
              {product.categories[0]?.name || "Ayurvedic Medicine"}
            </span>
            <RatingStars rating={product.average_rating} count={product.rating_count} />
          </div>

          {/* Title */}
          <Link
            href={`/shop/${product.slug}`}
            className="font-serif text-sm font-bold text-ayur-slate hover:text-ayur-forest transition-colors line-clamp-2"
          >
            {product.name}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-ayur-muted line-clamp-2 mt-1 font-normal">
            {product.short_description || product.acf?.short_description}
          </p>

          {/* Key Benefit Pill */}
          {product.acf?.key_benefits && product.acf.key_benefits.length > 0 && (
            <div className="mt-2 text-[11px] text-ayur-forest font-medium flex items-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-ayur-leaf shrink-0 mt-0.5" />
              <span className="line-clamp-1">{product.acf.key_benefits[0]}</span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-ayur-border/60 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-ayur-forest">
              ₹{product.price}
            </div>
            {product.on_sale && (
              <div className="text-[11px] text-ayur-muted line-through">
                M.R.P: ₹{product.regular_price}
              </div>
            )}
          </div>

          <button
            onClick={() => addItem(product, 1)}
            className="bg-ayur-stone hover:bg-ayur-forest hover:text-white text-ayur-forest text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
