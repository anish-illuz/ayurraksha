"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotalCount } =
    useCartStore();

  const subtotal = getSubtotal();
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ayur-slate/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-elevated border-l border-ayur-border flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-ayur-cream border-b border-ayur-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-ayur-forest" />
              <h2 className="font-serif text-lg font-bold text-ayur-slate">
                Your Cart ({getTotalCount()})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-ayur-muted hover:text-ayur-slate rounded-full hover:bg-ayur-stone"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-ayur-stone/60 px-6 py-3 border-b border-ayur-border">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs text-ayur-forest font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ayur-gold" />
                Congratulations! You unlocked FREE Express Pan-India Shipping!
              </p>
            ) : (
              <div>
                <p className="text-xs text-ayur-slate font-medium">
                  Add <span className="font-bold text-ayur-forest">₹{remainingForFreeShipping}</span> more to unlock FREE Express Shipping!
                </p>
                <div className="w-full bg-ayur-border h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-ayur-forest h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-ayur-border">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-ayur-muted mx-auto mb-3" />
                <p className="font-serif text-lg text-ayur-slate font-bold">Your cart is empty</p>
                <p className="text-xs text-ayur-muted mt-1 max-w-xs mx-auto">
                  Explore our doctor-formulated Ayurvedic remedies to start your wellness journey.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 inline-block bg-ayur-forest text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-ayur-deep transition-colors"
                >
                  Explore AyurRaksha Shop
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="relative w-20 h-20 rounded-ayur overflow-hidden bg-ayur-stone shrink-0 border border-ayur-border">
                    <Image
                      src={
                        product.images[0]?.src ||
                        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${product.slug}`}
                      onClick={closeCart}
                      className="font-medium text-xs text-ayur-slate hover:text-ayur-forest line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs font-bold text-ayur-forest mt-1">₹{product.price}</div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-ayur-border rounded-lg bg-ayur-cream">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-ayur-slate hover:text-ayur-forest"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-ayur-slate">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-ayur-slate hover:text-ayur-forest"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-ayur-muted hover:text-red-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-ayur-cream border-t border-ayur-border space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-ayur-slate">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-ayur-slate">
                  <span>Shipping</span>
                  <span className="font-semibold text-ayur-forest">
                    {subtotal >= freeShippingThreshold ? "FREE" : "₹99"}
                  </span>
                </div>
              </div>

              <div className="h-px bg-ayur-border" />

              <div className="flex justify-between text-sm font-bold text-ayur-slate">
                <span>Total Amount</span>
                <span className="text-base text-ayur-forest">
                  ₹{subtotal >= freeShippingThreshold ? subtotal : subtotal + 99}
                </span>
              </div>

              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full bg-ayur-forest text-white py-3.5 rounded-ayur font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-soft transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-ayur-gold" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
