"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, HelpCircle, User } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { SearchModal } from "../search/SearchModal";
import { CartDrawer } from "../cart/CartDrawer";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const totalCartCount = useCartStore((state) => state.getTotalCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds.length);

  return (
    <>
      <header className="sticky top-0 z-40 bg-ayur-cream/95 backdrop-blur-md border-b border-ayur-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-44 h-12">
                  <Image
                    src="/brand/logo.png"
                    alt="AyurRaksha Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-ayur-slate">
              <Link href="/" className="hover:text-ayur-forest transition-colors py-2">
                Home
              </Link>

              {/* Shop Menu Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 hover:text-ayur-forest transition-colors"
                >
                  <span>Shop</span>
                  <ChevronDown className="w-4 h-4 text-ayur-muted" />
                </Link>

                {isShopDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-ayur shadow-elevated border border-ayur-border py-3 z-50 animate-fadeIn">
                    <Link
                      href="/shop"
                      className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ayur-forest hover:bg-ayur-cream"
                    >
                      All Products
                    </Link>
                    <div className="h-px bg-ayur-border my-1" />
                    <Link href="/shop?sortBy=popularity" className="block px-4 py-2 text-xs text-ayur-slate hover:bg-ayur-cream">
                      Bestsellers
                    </Link>
                    <Link href="/shop?category=herbal-capsules" className="block px-4 py-2 text-xs text-ayur-slate hover:bg-ayur-cream">
                      Herbal Capsules
                    </Link>
                    <Link href="/shop?category=medicated-oils" className="block px-4 py-2 text-xs text-ayur-slate hover:bg-ayur-cream">
                      Medicated Oils (Tailam)
                    </Link>
                    <Link href="/shop?category=pure-resins" className="block px-4 py-2 text-xs text-ayur-slate hover:bg-ayur-cream">
                      Himalayan Shilajit & Resins
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/health-concerns" className="hover:text-ayur-forest transition-colors py-2">
                Health Concerns
              </Link>

              <Link href="/about" className="hover:text-ayur-forest transition-colors py-2">
                Ayurveda & Story
              </Link>

              <Link href="/blog" className="hover:text-ayur-forest transition-colors py-2">
                Ayurveda Journal
              </Link>

              <Link href="/contact" className="hover:text-ayur-forest transition-colors py-2">
                Contact
              </Link>
            </nav>

            {/* Right Action Icons & Quiz CTA */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Wellness Quiz CTA Button */}
              <Link
                href="/quiz"
                className="hidden xl:flex items-center gap-1.5 bg-ayur-stone text-ayur-forest hover:bg-ayur-forest hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold border border-ayur-forest/20 transition-all shadow-sm"
              >
                <HelpCircle className="w-3.5 h-3.5 text-ayur-gold" />
                <span>Not Sure Which Product?</span>
              </Link>

              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-ayur-slate hover:text-ayur-forest rounded-full hover:bg-ayur-stone transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/shop?wishlist=true"
                className="relative p-2 text-ayur-slate hover:text-ayur-forest rounded-full hover:bg-ayur-stone transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-ayur-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleCart}
                className="relative p-2 bg-ayur-forest text-white rounded-full hover:bg-ayur-deep transition-colors shadow-soft"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ayur-gold text-ayur-deep text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-ayur-slate hover:text-ayur-forest rounded-md"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-ayur-border px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <Link
              href="/quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-ayur-forest text-white py-2.5 rounded-ayur text-xs font-semibold text-center w-full"
            >
              <HelpCircle className="w-4 h-4 text-ayur-gold" />
              <span>Not Sure Which Product? Take Quiz</span>
            </Link>

            <nav className="space-y-1 text-sm font-medium pt-2">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-ayur-cream"
              >
                Shop All Products
              </Link>
              <Link
                href="/health-concerns"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-ayur-cream"
              >
                Shop by Health Concern
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-ayur-cream"
              >
                Ayurveda & Brand Story
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-ayur-cream"
              >
                Ayurveda Journal
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-ayur-cream"
              >
                Contact & Doctor Consultation
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Cart Drawer */}
      <CartDrawer />
    </>
  );
};
