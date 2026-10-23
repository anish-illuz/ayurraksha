"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalCount } = useCartStore();

  const subtotal = getSubtotal();
  const freeShippingThreshold = 999;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="bg-ayur-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-3xl font-extrabold text-ayur-slate">
          Shopping Cart ({getTotalCount()} Items)
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-ayur-border shadow-soft space-y-4">
            <ShoppingBag className="w-12 h-12 text-ayur-muted mx-auto" />
            <h2 className="font-serif text-xl font-bold text-ayur-slate">Your cart is currently empty</h2>
            <p className="text-xs text-ayur-muted max-w-sm mx-auto">
              Explore our doctor-formulated Ayurvedic remedies to restore your natural health.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-ayur-forest text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-ayur-deep"
            >
              Shop Remedies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-ayur-border shadow-soft space-y-4 divide-y divide-ayur-border">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4 sm:gap-6 items-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-ayur-stone shrink-0 border border-ayur-border">
                    <Image src={product.images[0]?.src || ""} alt={product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <Link href={`/shop/${product.slug}`} className="font-serif text-sm sm:text-base font-bold text-ayur-slate hover:text-ayur-forest line-clamp-1">
                      {product.name}
                    </Link>
                    <div className="text-xs font-bold text-ayur-forest">₹{product.price}</div>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center border border-ayur-border rounded-lg bg-ayur-cream">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 text-ayur-slate hover:text-ayur-forest">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 text-ayur-slate hover:text-ayur-forest">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button onClick={() => removeItem(product.id)} className="text-xs text-ayur-muted hover:text-red-600 flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-extrabold text-sm sm:text-base text-ayur-forest">
                    ₹{product.price * quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-ayur-border shadow-card space-y-4">
              <h2 className="font-serif text-lg font-bold text-ayur-slate">Order Summary</h2>

              <div className="space-y-2 text-xs text-ayur-slate">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-ayur-forest">{shipping === 0 ? "FREE" : "₹99"}</span>
                </div>
              </div>

              <div className="h-px bg-ayur-border" />

              <div className="flex justify-between text-base font-extrabold text-ayur-slate">
                <span>Total Payable</span>
                <span className="text-ayur-forest text-xl">₹{total}</span>
              </div>

              <button
                onClick={() => alert("Redirecting to Headless WooCommerce Encrypted Checkout Gateway...")}
                className="w-full bg-ayur-forest text-white py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-card transition-all"
              >
                <span>Proceed to Encrypted Checkout</span>
                <ArrowRight className="w-4 h-4 text-ayur-gold" />
              </button>

              <div className="text-[11px] text-ayur-muted text-center flex items-center justify-center gap-1 pt-2">
                <ShieldCheck className="w-4 h-4 text-ayur-forest" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
