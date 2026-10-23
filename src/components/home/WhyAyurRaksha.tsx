import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, TestTube2, HeartHandshake } from "lucide-react";

export const WhyAyurRaksha: React.FC = () => {
  const points = [
    {
      icon: Award,
      title: "Classical Text Accuracy",
      desc: "Formulated precisely according to Charaka Samhita and Sharangdhara Samhita guidelines without shortcuts.",
    },
    {
      icon: TestTube2,
      title: "Third-Party Heavy Metal Testing",
      desc: "Every batch is independently certified for zero lead, mercury, arsenic, or pesticide residues.",
    },
    {
      icon: HeartHandshake,
      title: "Wild-Harvested Potency",
      desc: "Botanicals gathered directly from high-altitude Himalayan regions during peak seasonal potency.",
    },
  ];

  return (
    <section className="py-20 bg-ayur-cream border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
                alt="AyurRaksha Herbal Processing"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-elevated border-4 border-white hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80"
                alt="Ayurvedic Botanicals"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
                Our Difference
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate mt-1">
                Why Discerning Patients & Doctors Choose AyurRaksha
              </h2>
            </div>

            <p className="text-sm text-ayur-muted leading-relaxed">
              We bridge 5,000 years of Vedic wisdom with contemporary pharmaceutical rigor. Where commercial brands use diluted powders and synthetic binders, AyurRaksha extracts pure therapeutic bio-actives.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-ayur-border shadow-soft">
                    <div className="w-10 h-10 rounded-xl bg-ayur-lightLeaf text-ayur-forest flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-ayur-slate">{pt.title}</h4>
                      <p className="text-xs text-ayur-muted mt-1 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
