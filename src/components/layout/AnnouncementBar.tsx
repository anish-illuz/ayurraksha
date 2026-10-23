import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-ayur-deep text-ayur-cream text-xs py-2 px-4 border-b border-ayur-forest/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-ayur-gold animate-pulse" />
          <span>Authentic Ayurvedic Formulations • Free Shipping on Orders Over ₹999</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-ayur-sand text-[11px]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-ayur-gold" /> 100% Lab Tested & Doctor Formulated
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-ayur-gold" /> Express Pan-India Delivery
          </span>
        </div>
      </div>
    </div>
  );
};
