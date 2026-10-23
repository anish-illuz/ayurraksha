import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const FindWellnessSolution: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-herbal text-white relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-ayur-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-ayur-gold/20 text-ayur-gold rounded-full px-3.5 py-1 text-xs font-bold border border-ayur-gold/30">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Ayurvedic Finder</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Not Sure What's Right For Your Body Type?
            </h2>

            <p className="text-sm sm:text-base text-ayur-sand/90 font-normal max-w-2xl leading-relaxed">
              Take our 60-second interactive Ayurvedic consultation quiz. Answer 4 simple questions about your daily routine and body symptoms to receive doctor-backed herbal recommendations tailored to your Dosha profile.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-ayur-sand">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ayur-gold" /> BAMS Doctor Algorithm
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ayur-gold" /> Instant Recommendations
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/quiz"
              className="w-full sm:w-auto bg-ayur-gold text-ayur-deep hover:bg-white hover:text-ayur-forest px-8 py-4 rounded-ayur text-sm font-bold flex items-center justify-center gap-2.5 shadow-elevated transition-all group"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Take Free Wellness Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
