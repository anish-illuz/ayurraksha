"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, HelpCircle, ArrowRight, CheckCircle2, RotateCcw, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock/data";
import { useCartStore } from "@/lib/store/cart";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const addItem = useCartStore((state) => state.addItem);

  const questions = [
    {
      id: "goal",
      question: "What is your primary health & wellness goal?",
      options: [
        { label: "Improve Digestion & Eliminate Bloating", targetSlug: "triphala-digestive-care" },
        { label: "Reduce Stress, Cortisol & Sleep Better", targetSlug: "ashwagandha-stress-relief" },
        { label: "Relieve Joint Pain & Enhance Flexibility", targetSlug: "curcumin-joint-care" },
        { label: "Boost Physical Energy & Male Stamina", targetSlug: "shilajit-vitality-resin" },
        { label: "Clear Skin Pigmentation & Enhance Radiant Glow", targetSlug: "kumkumadi-radiance-oil" },
      ],
    },
    {
      id: "symptom",
      question: "Which daily symptom bothers you the most?",
      options: [
        { label: "Morning acidity, sluggish gut, or constipation" },
        { label: "Evening anxiety, racing thoughts, or light sleep" },
        { label: "Knee stiffness when climbing stairs or working out" },
        { label: "Mid-afternoon fatigue and physical burnout" },
      ],
    },
    {
      id: "routine",
      question: "Describe your current daily routine & lifestyle:",
      options: [
        { label: "Desk job with long sitting hours and high screen time" },
        { label: "Active lifestyle, regular workouts or physical labor" },
        { label: "Frequent business travel and irregular meal timings" },
      ],
    },
  ];

  const handleSelectOption = (targetSlug?: string) => {
    if (targetSlug) {
      setAnswers((prev) => ({ ...prev, recommendedSlug: targetSlug }));
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Finished, show results
    }
  };

  const matchedProduct =
    MOCK_PRODUCTS.find((p) => p.slug === (answers.recommendedSlug || "triphala-digestive-care")) ||
    MOCK_PRODUCTS[0];

  return (
    <div className="bg-ayur-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-ayur-border shadow-card">
        {step < questions.length ? (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-ayur-border pb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ayur-forest">
                <HelpCircle className="w-4 h-4 text-ayur-gold" />
                <span>Question {step + 1} of {questions.length}</span>
              </div>
              <div className="text-xs font-semibold text-ayur-muted">
                {Math.round(((step + 1) / questions.length) * 100)}% Complete
              </div>
            </div>

            {/* Question Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-ayur-slate">
              {questions[step].question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption((opt as any).targetSlug)}
                  className="w-full text-left p-4 rounded-2xl bg-ayur-cream hover:bg-ayur-stone border border-ayur-border hover:border-ayur-forest transition-all flex items-center justify-between group"
                >
                  <span className="text-xs sm:text-sm font-medium text-ayur-slate group-hover:text-ayur-forest">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-ayur-muted group-hover:text-ayur-forest group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT RECOMMENDATION CARD */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-ayur-lightLeaf text-ayur-forest rounded-full px-4 py-1 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-ayur-gold" />
              <span>Diagnostic Consultation Complete</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-ayur-slate">
              Your Recommended Ayurvedic Remedy
            </h2>
            <p className="text-xs sm:text-sm text-ayur-muted max-w-md mx-auto">
              Based on your symptom inputs, our BAMS Vaidya formulation engine recommends:
            </p>

            {/* Product Card Showcase */}
            <div className="p-6 rounded-2xl bg-ayur-cream border border-ayur-border text-left flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-white shrink-0 shadow-soft border border-ayur-border">
                <Image
                  src={matchedProduct.images[0]?.src || ""}
                  alt={matchedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ayur-forest">
                  {matchedProduct.categories[0]?.name || "Doctor Formulated"}
                </span>
                <h3 className="font-serif text-lg font-bold text-ayur-slate">{matchedProduct.name}</h3>
                <p className="text-xs text-ayur-muted line-clamp-2">{matchedProduct.short_description}</p>
                <div className="text-base font-extrabold text-ayur-forest">₹{matchedProduct.price}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => addItem(matchedProduct, 1)}
                className="flex-1 bg-ayur-forest text-white py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-card"
              >
                <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                <span>Add Recommended Remedy To Cart</span>
              </button>

              <button
                onClick={() => setStep(0)}
                className="p-3 rounded-xl border border-ayur-border text-ayur-slate hover:bg-ayur-stone text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
