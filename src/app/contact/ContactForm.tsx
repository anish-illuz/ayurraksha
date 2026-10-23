"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-ayur-cream p-8 rounded-2xl border border-ayur-border text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-ayur-forest mx-auto" />
        <h3 className="font-serif text-lg font-bold text-ayur-slate">Thank you! Message Received.</h3>
        <p className="text-xs text-ayur-muted max-w-xs mx-auto">
          Our Ayurvedic Vaidya support team will review your inquiry and contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-ayur-slate mb-1">Your Full Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-ayur-cream border border-ayur-border rounded-xl p-3 text-xs text-ayur-slate focus:outline-none focus:border-ayur-forest"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-ayur-slate mb-1">Phone Number</label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            className="w-full bg-ayur-cream border border-ayur-border rounded-xl p-3 text-xs text-ayur-slate focus:outline-none focus:border-ayur-forest"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-ayur-slate mb-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="rahul@example.com"
          className="w-full bg-ayur-cream border border-ayur-border rounded-xl p-3 text-xs text-ayur-slate focus:outline-none focus:border-ayur-forest"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-ayur-slate mb-1">Your Message or Health Concern</label>
        <textarea
          rows={4}
          required
          placeholder="Describe your health question or order query..."
          className="w-full bg-ayur-cream border border-ayur-border rounded-xl p-3 text-xs text-ayur-slate focus:outline-none focus:border-ayur-forest"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-ayur-forest text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-ayur-deep shadow-soft transition-all"
      >
        <Send className="w-4 h-4 text-ayur-gold" />
        <span>Submit Inquiry</span>
      </button>
    </form>
  );
};
