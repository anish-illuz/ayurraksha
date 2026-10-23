import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HEALTH_CONCERNS } from "@/lib/mock/data";
import { ArrowUpRight } from "lucide-react";

export const HealthConcernsGrid: React.FC = () => {
  return (
    <section className="py-16 bg-ayur-cream border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
              Targeted Remedies
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate mt-1">
              Shop By Health Concern
            </h2>
            <p className="text-sm text-ayur-muted mt-1 max-w-xl">
              Target your root imbalances with specialized Ayurvedic botanical formulations.
            </p>
          </div>

          <Link
            href="/health-concerns"
            className="text-xs font-bold text-ayur-forest hover:text-ayur-deep flex items-center gap-1 group"
          >
            <span>View All Health Concerns</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {HEALTH_CONCERNS.map((item) => (
            <Link
              key={item.id}
              href={`/shop?healthConcern=${encodeURIComponent(item.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-soft border border-ayur-border hover:shadow-card transition-all"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ayur-slate/85 via-ayur-slate/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold group-hover:text-ayur-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ayur-sand/90 font-medium">{item.count} Remedies</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-ayur-forest transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
