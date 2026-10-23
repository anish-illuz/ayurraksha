import React from "react";
import { Metadata } from "next";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  // Frontend-only route (no WP counterpart) — Rank Math's "Page not found"
  // head is discarded by generateNextMetadata; curated values are used.
  return generateNextMetadata("/contact", {
    title: "Contact Us & Free Doctor Consultation | AyurRaksha",
    description:
      "Get in touch with AyurRaksha customer support or consult with our BAMS Ayurvedic Vaidya team.",
  });
}

export default function ContactPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
            Customer Support & Vaidya Helpline
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-ayur-slate">
            We Are Here To Guide Your Wellness Journey
          </h1>
          <p className="text-xs sm:text-sm text-ayur-muted">
            Have questions about product dosage, order tracking, or Dosha suitability?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card Column */}
          <div className="lg:col-span-5 bg-ayur-forest text-white p-8 rounded-3xl space-y-6 shadow-card">
            <h2 className="font-serif text-xl font-bold">Contact Details</h2>

            <div className="space-y-4 text-xs font-medium text-ayur-sand/90">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-ayur-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Free Doctor Helpline</div>
                  <div>+91 1800-AYUR-RAKSHA (Mon-Sat 9AM-7PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-ayur-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Email Support</div>
                  <div>support@ayurrakshaonline.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ayur-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Ayurvedic Apothecary Hub</div>
                  <div>Vedic Herbs Research & Dispatch Center, Bengaluru, Karnataka, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-ayur-border shadow-soft">
            <h2 className="font-serif text-xl font-bold text-ayur-slate mb-6">Send Us A Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
