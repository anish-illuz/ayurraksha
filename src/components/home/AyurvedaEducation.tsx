import React from "react";
import Link from "next/link";
import { Wind, Flame, Mountain, ArrowRight } from "lucide-react";

export const AyurvedaEducation: React.FC = () => {
  const doshas = [
    {
      icon: Wind,
      name: "Vata Dosha",
      elements: "Air & Ether",
      traits: "Governs nerve impulses, joint mobility, and mental alertness.",
      balanceKey: "Balanced by warm, grounding foods & Triphala",
      color: "bg-blue-50 text-blue-800 border-blue-100",
    },
    {
      icon: Flame,
      name: "Pitta Dosha",
      elements: "Fire & Water",
      traits: "Governs metabolic digestion (Agni), liver function, and skin radiance.",
      balanceKey: "Balanced by cooling botanicals like Shatavari & Kumkumadi",
      color: "bg-amber-50 text-amber-800 border-amber-100",
    },
    {
      icon: Mountain,
      name: "Kapha Dosha",
      elements: "Earth & Water",
      traits: "Governs physical stamina, structural joint lubrication, and immune resilience.",
      balanceKey: "Balanced by revitalizers like Shilajit & Pippali",
      color: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
            Vedic Wisdom Simplified
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate">
            Understanding Your Three Biological Doshas
          </h2>
          <p className="text-sm text-ayur-muted">
            Ayurveda views optimal health as a harmony of your body's constitutional energies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doshas.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${d.color} space-y-3 flex flex-col justify-between shadow-soft hover:shadow-card transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                      {d.elements}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold mt-4">{d.name}</h3>
                  <p className="text-xs mt-2 leading-relaxed opacity-90">{d.traits}</p>
                </div>

                <div className="pt-3 border-t border-black/10 text-[11px] font-semibold">
                  {d.balanceKey}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog/understanding-your-prakriti-doshas"
            className="inline-flex items-center gap-2 text-xs font-bold text-ayur-forest hover:text-ayur-deep bg-ayur-stone px-5 py-3 rounded-full border border-ayur-border transition-colors"
          >
            <span>Read Full Guide: How to Determine Your Prakriti</span>
            <ArrowRight className="w-4 h-4 text-ayur-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
