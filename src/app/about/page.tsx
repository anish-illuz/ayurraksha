import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { RankMathJsonLd } from "@/components/seo/RankMathJsonLd";
import { ShieldCheck, Award, Leaf, Stethoscope } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  // Rank Math maintains the About SEO (WP page `about-us-2`); canonicalize to the
  // frontend /about. Body content stays curated in Next.js (the WP page is
  // Elementor output, which can't render cleanly headless).
  return generateNextMetadata(
    "/about",
    {
      title: "About AyurRaksha — Heritage, Science & Purity",
      description:
        "Learn how AyurRaksha blends 5,000 years of classical Ayurvedic heritage with modern pharmaceutical quality testing.",
    },
    "/about-us-2/"
  );
}

export default async function AboutPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-12">
      {/* Live Rank Math About-page schema (Organization / Breadcrumb) */}
      <RankMathJsonLd url="/about-us-2/" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ayur-slate leading-tight">
            Restoring Authentic Ayurveda To Everyday Life
          </h1>
          <p className="text-sm sm:text-base text-ayur-muted leading-relaxed">
            AyurRaksha was founded on a singular principle: true Ayurvedic medicine must never compromise on classical text ratios, botanical harvesting seasons, or heavy metal safety.
          </p>
        </div>

        {/* Visual Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-ayur-border shadow-soft">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border-4 border-ayur-cream">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
              alt="AyurRaksha Doctor Formulation"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif text-2xl font-extrabold text-ayur-slate">
              Formulated by BAMS Vaidyas, Backed by NABL Labs
            </h2>
            <p className="text-xs sm:text-sm text-ayur-muted leading-relaxed">
              While commercial markets flooded stores with diluted herbal powders, our clinical team established direct relationships with high-altitude Himalayan harvesters. Each herb—from KSM-66 Ashwagandha to wild Shilajit—is tested before batch preparation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold text-ayur-slate">
              <div className="p-4 rounded-xl bg-ayur-stone flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-ayur-forest shrink-0" />
                <span>Zero Synthetic Binders</span>
              </div>
              <div className="p-4 rounded-xl bg-ayur-stone flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-ayur-forest shrink-0" />
                <span>Doctor Monitored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
