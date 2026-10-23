import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-herbal text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ayur-forest/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-ayur-gold/20 text-ayur-gold rounded-full px-4 py-1.5 text-xs font-bold border border-ayur-gold/30">
          <Sparkles className="w-4 h-4" />
          <span>Begin Your Transformation Today</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Start Your Personal Ayurvedic Wellness Journey
        </h2>

        <p className="text-sm sm:text-base text-ayur-sand/90 font-normal max-w-2xl mx-auto leading-relaxed">
          Experience authentic, doctor-guided herbal remedies crafted to restore balance, digestion, sleep, and long-term vitality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-ayur-gold text-ayur-deep hover:bg-white hover:text-ayur-forest px-8 py-4 rounded-ayur text-sm font-bold flex items-center justify-center gap-2 shadow-elevated transition-all group"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/quiz"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-4 rounded-ayur text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-ayur-gold" />
            <span>Find Your Product</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
