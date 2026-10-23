import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/mock/data";
import { Clock, User, ArrowRight } from "lucide-react";

interface BlogJournalSectionProps {
  posts: BlogPost[];
}

export const BlogJournalSection: React.FC<BlogJournalSectionProps> = ({ posts }) => {
  return (
    <section className="py-16 bg-white border-b border-ayur-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ayur-forest">
              Ayurveda Journal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-ayur-slate mt-1">
              Vedic Wisdom & Modern Health Insights
            </h2>
            <p className="text-sm text-ayur-muted mt-1 max-w-xl">
              Evidence-based articles written by experienced BAMS Vaidyas and natural wellness researchers.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-xs font-bold text-ayur-forest hover:text-ayur-deep flex items-center gap-1 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-ayur-cream rounded-2xl overflow-hidden border border-ayur-border shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row group"
            >
              <div className="relative aspect-[4/3] sm:w-1/2 overflow-hidden bg-ayur-stone">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-ayur-forest">
                    <span className="bg-white px-2.5 py-0.5 rounded-full border border-ayur-border">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-ayur-muted font-normal">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-ayur-slate group-hover:text-ayur-forest transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-ayur-muted line-clamp-2">{post.excerpt}</p>
                </div>

                <div className="pt-3 border-t border-ayur-border/60 flex items-center justify-between text-[11px] text-ayur-slate">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3 h-3 text-ayur-forest" /> {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-ayur-forest flex items-center gap-0.5 hover:underline"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
