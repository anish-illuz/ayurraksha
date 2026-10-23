import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogListing } from "@/lib/api/blog";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { RankMathJsonLd } from "@/components/seo/RankMathJsonLd";
import { Clock, User, ArrowRight, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  // Rank Math maintains the /blog/ archive SEO; canonicalize to the frontend.
  return generateNextMetadata(
    "/blog",
    {
      title: "Ayurveda Journal & Vedic Health Research | AyurRaksha",
      description:
        "Read evidence-based articles on Doshas, digestion, Triphala, Ashwagandha, and natural remedies written by BAMS Vaidyas.",
    },
    "/blog/"
  );
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Math.max(1, parseInt(typeof searchParams?.page === "string" ? searchParams.page : "1", 10) || 1);
  const { posts, total, totalPages } = await getBlogListing(page, 12);

  const pageHref = (n: number) =>
    n <= 1 ? "/blog" : `/blog?page=${n}`;

  return (
    <div className="bg-ayur-cream min-h-screen py-12">
      {/* Live Rank Math archive schema for the journal */}
      <RankMathJsonLd url="/blog/" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ayur-forest">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            <span>Vedic Knowledge Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-ayur-slate">
            AyurRaksha Wellness Journal
          </h1>
          <p className="text-xs sm:text-sm text-ayur-muted">
            Bridging 5,000-year-old Ayurvedic scriptures with contemporary botanical research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-ayur-border shadow-soft hover:shadow-card transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-ayur-stone">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-ayur-forest">
                    <span className="bg-ayur-stone px-3 py-1 rounded-full border border-ayur-border">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-ayur-muted font-normal">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-ayur-slate group-hover:text-ayur-forest transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-ayur-muted leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-ayur-border flex items-center justify-between text-xs text-ayur-slate">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <User className="w-4 h-4 text-ayur-forest" /> {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-ayur-forest flex items-center gap-1 hover:underline"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <Link
              href={page > 1 ? pageHref(page - 1) : "#"}
              aria-disabled={page <= 1}
              className={`px-4 py-2 rounded-lg text-xs font-bold border border-ayur-border transition-colors ${
                page > 1 ? "bg-white text-ayur-slate hover:bg-ayur-stone" : "opacity-40 cursor-not-allowed"
              }`}
            >
              ← Newer
            </Link>
            <span className="text-xs font-semibold text-ayur-muted px-3 py-2">
              Page {page} of {totalPages} · {total} articles
            </span>
            <Link
              href={page < totalPages ? pageHref(page + 1) : "#"}
              aria-disabled={page >= totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-bold border border-ayur-border transition-colors ${
                page < totalPages ? "bg-white text-ayur-slate hover:bg-ayur-stone" : "opacity-40 cursor-not-allowed"
              }`}
            >
              Older →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
