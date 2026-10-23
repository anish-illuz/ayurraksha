import React from "react";
import { Metadata } from "next";
import { getProducts, getFeaturedProducts } from "@/lib/api/products";
import { getBlogPosts } from "@/lib/api/blog";
import { generateNextMetadata } from "@/lib/api/rankmath";

import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { HealthConcernsGrid } from "@/components/home/HealthConcernsGrid";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { FindWellnessSolution } from "@/components/home/FindWellnessSolution";
import { WhyAyurRaksha } from "@/components/home/WhyAyurRaksha";
import { AyurvedaEducation } from "@/components/home/AyurvedaEducation";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { FBTBundleShowcase } from "@/components/home/FBTBundleShowcase";
import { BlogJournalSection } from "@/components/home/BlogJournalSection";
import { HomepageFAQ } from "@/components/home/HomepageFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { RankMathJsonLd } from "@/components/seo/RankMathJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  // Look Rank Math up by the WP homepage URL; canonicalize to the frontend.
  return generateNextMetadata("/", {
    title: "AyurRaksha Online — Ancient Ayurvedic Wisdom. Formulated for Modern Life.",
    description: "Shop doctor-formulated, USDA organic Ayurvedic supplements, Triphala, KSM-66 Ashwagandha, and Himalayan Shilajit.",
  }, "/");
}

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = await getFeaturedProducts();
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-ayur-cream">
      {/* Live Rank Math Organization / WebSite / SearchAction schema for the home */}
      <RankMathJsonLd url="/" />

      {/* SECTION 1 — HERO */}
      <HeroSection />

      {/* SECTION 2 — TRUST BAR */}
      <TrustBar />

      {/* SECTION 3 — SHOP BY HEALTH CONCERN */}
      <HealthConcernsGrid />

      {/* SECTION 4 — BESTSELLERS */}
      <BestsellersSection products={featuredProducts} />

      {/* SECTION 5 — FIND YOUR WELLNESS SOLUTION */}
      <FindWellnessSolution />

      {/* SECTION 6 — WHY AYURRAKSHA */}
      <WhyAyurRaksha />

      {/* SECTION 7 — AYURVEDA EDUCATION */}
      <AyurvedaEducation />

      {/* SECTION 8 — FEATURED PRODUCTS / COLLECTIONS */}
      <FeaturedCollections products={allProducts} />

      {/* SECTION 9 — CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* SECTION 10 — FREQUENTLY BOUGHT TOGETHER */}
      <FBTBundleShowcase products={allProducts} />

      {/* SECTION 11 — BLOG / AYURVEDA JOURNAL */}
      <BlogJournalSection posts={blogPosts} />

      {/* SECTION 12 — FAQ */}
      <HomepageFAQ />

      {/* SECTION 13 — FINAL CTA */}
      <FinalCTA />
    </main>
  );
}
