import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getRecentBlogSlugs } from "@/lib/api/blog";
import { generateNextMetadata } from "@/lib/api/rankmath";
import { RankMathJsonLd } from "@/components/seo/RankMathJsonLd";
import { Clock, User, ArrowLeft, Share2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  // Rank Math keys this post's SEO by its WordPress permalink; the canonical
  // points to the frontend URL instead.
  return generateNextMetadata(
    `/blog/${post.slug}`,
    {
      title: `${post.title} | AyurRaksha Journal`,
      description: post.excerpt,
      ogImage: post.image,
    },
    post.link
  );
}

export async function generateStaticParams() {
  // Prerender the latest batch at build/ISR time; unknown slugs resolve on
  // demand via dynamicParams (the live journal has 200+ posts). Slugs only —
  // an embedded fetch here would exceed Next.js's 2MB ISR cache cap.
  const slugs = await getRecentBlogSlugs(40);
  return slugs.map((slug) => ({ slug }));
}

// Allow live slugs outside the static set (posts published after the build).
export const dynamicParams = true;

// Refresh prerendered post data hourly; new posts render on demand.
export const revalidate = 3600;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="bg-ayur-cream min-h-screen py-12">
      {/* Live Rank Math Article/Breadcrumb schema.org for this post */}
      <RankMathJsonLd url={post.link} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ayur-forest hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          <span className="bg-ayur-stone text-ayur-forest text-xs font-bold px-3 py-1 rounded-full border border-ayur-border">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ayur-slate leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-ayur-muted font-medium pt-2 border-b border-ayur-border pb-6">
            <span className="flex items-center gap-1.5 text-ayur-slate font-bold">
              <User className="w-4 h-4 text-ayur-forest" /> {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-card border border-ayur-border bg-ayur-stone">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-ayur-border shadow-soft prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-ayur-slate prose-p:text-sm prose-p:leading-relaxed prose-p:text-ayur-slate">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
}
