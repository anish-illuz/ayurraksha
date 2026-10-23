import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HEALTH_CONCERNS } from "@/lib/mock/data";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { ArrowUpRight, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  // Frontend-only route (no WP counterpart) — Rank Math's "Page not found"
  // head is discarded; curated values are used.
  return generateNextMetadata("/health-concerns", {
    title: "Shop By Health Concern | AyurRaksha Ayurvedic Apothecary",
    description:
      "Find targeted Ayurvedic remedies for Digestion, Immunity, Stress & Sleep, Joint Pain, Skin Care, Hair Growth, and Vitality.",
  });
}

export default function HealthConcernsPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ayur-forest">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            <span>Therapeutic Navigation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-ayur-slate">
            Ayurvedic Health Concern Directory
          </h1>
          <p className="text-xs sm:text-sm text-ayur-muted">
            Target your specific bodily imbalances with classical BAMS Vaidya formulation blends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_CONCERNS.map((hc) => (
            <Link
              key={hc.id}
              href={`/shop?healthConcern=${encodeURIComponent(hc.name)}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card border border-ayur-border hover:shadow-elevated transition-all"
            >
              <Image src={hc.image} alt={hc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ayur-slate/90 via-ayur-slate/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold group-hover:text-ayur-gold transition-colors">{hc.name}</h2>
                  <p className="text-xs text-ayur-sand/90 font-medium mt-1">{hc.count} Formulations Available</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-ayur-forest transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
