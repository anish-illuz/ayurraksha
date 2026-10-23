"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const HomepageFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are AyurRaksha products 100% natural and free from heavy metals?",
      answer:
        "Yes. Every single AyurRaksha formulation is prepared from 100% USDA organic wild-harvested botanicals. Each batch undergoes rigorous NABL lab testing to guarantee safety standards exceeding WHO and Ministry of AYUSH thresholds for lead, mercury, and pesticides.",
    },
    {
      question: "How long does it take to notice health improvements with Ayurveda?",
      answer:
        "Because Ayurvedic medicine works by balancing root metabolic fire (Agni) and eliminating toxins (Ama), acute relief (like digestive comfort) is often felt within 24 to 72 hours. Deep tissue rejuvenation (Rasayana) builds progressively over 30 to 90 days.",
    },
    {
      question: "Can I consume AyurRaksha supplements along with modern allopathic medicines?",
      answer:
        "In most instances, classical herbs like Triphala and Ashwagandha integrate safely. We advise maintaining a 45-to-60-minute gap between modern medications and herbal supplements, or consulting our BAMS Vaidya team.",
    },
    {
      question: "What is your delivery timeframe and shipping policy across India?",
      answer:
        "We offer free Express Pan-India shipping on all orders over ₹999. Orders are dispatched within 24 hours and delivered in 2 to 5 business days across all major metro and tier-2/3 cities.",
    },
    {
      question: "How do I know which AyurRaksha remedy is suitable for my Dosha profile?",
      answer:
        "You can take our free 60-second online Wellness Consultation Quiz. It asks 4 targeted questions regarding your digestion, sleep, and physical energy to recommend your ideal remedies.",
    },
  ];

  return (
    <section className="py-16 bg-ayur-cream border-b border-ayur-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ayur-forest">
            <HelpCircle className="w-4 h-4 text-ayur-gold" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-ayur-slate">
            Everything You Need To Know
          </h2>
          <p className="text-xs sm:text-sm text-ayur-muted">
            Got questions about our formulations, ingredients, or shipping? We've got answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-ayur-border overflow-hidden transition-all shadow-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif text-sm sm:text-base font-bold text-ayur-slate flex items-center justify-between gap-4 hover:text-ayur-forest"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-ayur-forest shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-ayur-muted leading-relaxed border-t border-ayur-border/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
