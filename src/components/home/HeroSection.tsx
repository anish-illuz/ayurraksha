import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, Star } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-cream overflow-hidden py-12 md:py-20 lg:py-24 border-b border-ayur-border">
      {/* Background Subtle Organic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ayur-gold/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-ayur-forest/5 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Positioning & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-ayur-forest/20 rounded-full px-4 py-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-ayur-gold" />
              <span className="text-xs font-bold text-ayur-forest tracking-wide uppercase">
                Authentic Headless Ayurvedic E-Commerce
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-ayur-slate leading-[1.15]">
              Ancient Ayurvedic Wisdom. <br className="hidden sm:inline" />
              <span className="text-ayur-forest">Formulated for Modern Life.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-ayur-muted max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Discover doctor-backed, classical Ayurvedic formulations created with 100% organic herbs. Pure, potent, heavy-metal tested, and delivered straight to your door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-ayur-forest text-white hover:bg-ayur-deep px-8 py-4 rounded-ayur text-sm font-bold flex items-center justify-center gap-2 shadow-card hover:shadow-elevated transition-all group"
              >
                <span>Shop All Formulations</span>
                <ArrowRight className="w-4 h-4 text-ayur-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/quiz"
                className="w-full sm:w-auto bg-white text-ayur-forest hover:bg-ayur-stone border border-ayur-border px-7 py-4 rounded-ayur text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <HelpCircle className="w-4 h-4 text-ayur-gold" />
                <span>Find Your Product</span>
              </Link>
            </div>

            {/* Trust Badges Bar Below Hero CTAs */}
            <div className="pt-6 border-t border-ayur-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ayur-slate font-medium">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-ayur-amber text-ayur-amber" />
                <span><strong className="font-bold text-ayur-forest">4.9/5</strong> Rating (2,400+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ayur-forest" />
                <span>100% Certified Organic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Hero Image Card */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated border-4 border-white bg-ayur-stone">
                <Image
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
                  alt="AyurRaksha Herbal Wellness Formulations"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ayur-slate/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-ayur-gold text-ayur-deep text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    Doctor Formulated
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-2">Triphala & KSM-66 Ashwagandha</h3>
                  <p className="text-xs text-ayur-sand/90 mt-1">Classically prepared for digestion, calm, and vitality.</p>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-ayur shadow-card border border-ayur-border hidden sm:flex items-center gap-3 max-w-xs animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-ayur-lightLeaf flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-ayur-forest" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ayur-slate">Heavy Metal Lab Tested</div>
                  <div className="text-[11px] text-ayur-muted">Exceeds WHO & AYUSH standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
