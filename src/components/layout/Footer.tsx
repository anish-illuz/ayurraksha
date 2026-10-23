"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ayur-slate text-ayur-cream border-t border-ayur-border/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter Row */}
        <div className="p-8 sm:p-10 rounded-3xl bg-ayur-deep border border-ayur-forest/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h3 className="font-serif text-2xl font-bold text-white">
              Subscribe to Ayurvedic Wellness & Exclusive Offerings
            </h3>
            <p className="text-xs text-ayur-sand/80">
              Receive Vaidya seasonal diet advice, herbal release alerts, and 10% off your first order.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full bg-white/10 text-white placeholder-ayur-sand/60 text-xs px-4 py-3.5 rounded-ayur border border-white/20 focus:outline-none focus:border-ayur-gold"
              />
              <button
                type="submit"
                className="bg-ayur-gold text-ayur-deep hover:bg-white font-bold text-xs px-5 py-3.5 rounded-ayur transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-44 h-12">
              <Image
                src="/brand/logo.png"
                alt="AyurRaksha Logo"
                fill
                className="object-contain object-left brightness-200 contrast-200"
              />
            </div>
            <p className="text-ayur-sand/80 leading-relaxed max-w-sm">
              AyurRaksha Online is dedicated to delivering classical, doctor-formulated Ayurvedic remedies. Decoupled, ultra-fast headless e-commerce engineered for health & trust.
            </p>
            <div className="space-y-2 text-ayur-sand/90 pt-2 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ayur-gold" />
                <span>Doctor Helpline: +91 1800-AYUR-RAKSHA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-ayur-gold" />
                <span>support@ayurrakshaonline.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ayur-gold" />
                <span>Vedic Herbs Research Hub, Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-ayur-gold">
              Shop Remedies
            </h4>
            <ul className="space-y-2 text-ayur-sand/80">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Formulations
                </Link>
              </li>
              <li>
                <Link href="/shop?sortBy=popularity" className="hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=herbal-capsules" className="hover:text-white transition-colors">
                  Herbal Capsules
                </Link>
              </li>
              <li>
                <Link href="/shop?category=medicated-oils" className="hover:text-white transition-colors">
                  Medicated Oils (Tailam)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pure-resins" className="hover:text-white transition-colors">
                  Pure Himalayan Shilajit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Health Concerns */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-ayur-gold">
              Health Concerns
            </h4>
            <ul className="space-y-2 text-ayur-sand/80">
              <li>
                <Link href="/shop?healthConcern=Digestion" className="hover:text-white transition-colors">
                  Digestion & Gut Health
                </Link>
              </li>
              <li>
                <Link href="/shop?healthConcern=Immunity" className="hover:text-white transition-colors">
                  Immunity & Protection
                </Link>
              </li>
              <li>
                <Link href="/shop?healthConcern=Stress" className="hover:text-white transition-colors">
                  Stress & Sleep
                </Link>
              </li>
              <li>
                <Link href="/shop?healthConcern=Joint" className="hover:text-white transition-colors">
                  Joint & Muscle Care
                </Link>
              </li>
              <li>
                <Link href="/shop?healthConcern=Skin" className="hover:text-white transition-colors">
                  Skin & Glow
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-ayur-gold">
              Information
            </h4>
            <ul className="space-y-2 text-ayur-sand/80">
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Wellness Quiz
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About AyurRaksha
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ayur-gold transition-colors">
                  Ayurveda Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-ayur-border/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ayur-sand/60 gap-4">
          <p>© {new Date().getFullYear()} AyurRaksha Online. All rights reserved.</p>
          <div className="flex items-center gap-2 text-ayur-gold">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted Headless WooCommerce Storefront</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
