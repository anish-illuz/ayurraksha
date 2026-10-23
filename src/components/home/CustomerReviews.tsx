import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { RatingStars } from "../product/RatingStars";

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: "Dr. Rajesh K. Vaidya",
      role: "BAMS Practitioner, Bengaluru",
      rating: 5,
      date: "August 2026",
      text: "As an Ayurvedic doctor, ingredient purity and classical processing matter tremendously. AyurRaksha's Triphala and Ashwagandha Gold deliver consistent, noticeable clinical results for my patients.",
      product: "Triphala Rasayana & KSM-66 Ashwagandha",
      verified: true,
    },
    {
      name: "Ananya Sharma",
      role: "Verified Buyer, Mumbai",
      rating: 5,
      date: "August 2026",
      text: "My morning acidity and bloating completely disappeared within 4 days of taking the Triphala capsules. The packaging is eco-friendly, and delivery was amazingly fast!",
      product: "Organic Triphala Rasayana Capsules",
      verified: true,
    },
    {
      name: "Vikram Rathore",
      role: "Verified Buyer, New Delhi",
      rating: 5,
      date: "August 2026",
      text: "The Himalayan Shilajit resin is 100% genuine. The energy boost throughout my long office workdays and workouts has been remarkable. Highly recommended!",
      product: "Himalayan Gold Pure Shilajit Resin",
      verified: true,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ayur-forest">
            <Star className="w-4 h-4 fill-ayur-amber text-ayur-amber" />
            <span>4.9 / 5 Overall Satisfaction</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate">
            Real Stories From Real Practitioners & Patients
          </h2>
          <p className="text-sm text-ayur-muted">
            Over 25,000+ verified orders delivered with uncompromised Ayurvedic purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-ayur-cream p-6 rounded-2xl border border-ayur-border flex flex-col justify-between space-y-4 shadow-soft hover:shadow-card transition-all relative"
            >
              <Quote className="w-8 h-8 text-ayur-gold/30 absolute top-4 right-4" />
              <div className="space-y-3">
                <RatingStars rating={rev.rating} size={16} />
                <p className="text-xs sm:text-sm text-ayur-slate leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-ayur-border flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm font-bold text-ayur-slate flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ayur-forest" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ayur-muted">{rev.role}</div>
                  <div className="text-[10px] text-ayur-forest font-semibold mt-1">
                    Purchased: {rev.product}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
