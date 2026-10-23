import React from "react";
import { ShieldCheck, Leaf, Stethoscope, Lock, Truck } from "lucide-react";

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Authentic Ayurvedic Remedies",
      subtitle: "Traditional classical recipes",
    },
    {
      icon: Leaf,
      title: "100% Organic Botanicals",
      subtitle: "Zero synthetic additives",
    },
    {
      icon: Stethoscope,
      title: "Doctor Guided Wellness",
      subtitle: "BAMS Vaidya formulations",
    },
    {
      icon: Lock,
      title: "100% Encrypted Checkout",
      subtitle: "Safe payment processing",
    },
    {
      icon: Truck,
      title: "Express Pan-India Delivery",
      subtitle: "Free shipping over ₹999",
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-ayur-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 p-2 group">
                <div className="w-10 h-10 rounded-full bg-ayur-stone group-hover:bg-ayur-forest group-hover:text-white text-ayur-forest flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ayur-slate leading-tight">{item.title}</div>
                  <div className="text-[11px] text-ayur-muted mt-0.5">{item.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
