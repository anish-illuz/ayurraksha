"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, X, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { searchProducts } from "@/lib/api/products";
import { SearchResult } from "@/lib/types/woocommerce";
import { useCartStore } from "@/lib/store/cart";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({
    products: [],
    categories: [],
    healthConcerns: [],
    blogs: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults({ products: [], categories: [], healthConcerns: [], blogs: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [], healthConcerns: [], blogs: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const res = await searchProducts(query);
      setResults(res);
      setIsSearching(false);
    }, 250); // Debounced instant typing search

    return () => clearTimeout(timer);
  }, [query]);

  // Voice Search Web Speech API Integration
  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported by your browser. Please type your search query.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ayur-slate/70 backdrop-blur-sm flex justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-elevated border border-ayur-border w-full max-w-3xl overflow-hidden self-start mt-8 sm:mt-12">
        {/* Top Input Bar */}
        <div className="p-4 sm:p-6 bg-ayur-cream border-b border-ayur-border flex items-center gap-3">
          <Search className="w-6 h-6 text-ayur-forest shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type health concern (e.g. 'digestion', 'immunity') or herb name..."
            className="w-full bg-transparent text-lg text-ayur-slate placeholder-ayur-muted focus:outline-none font-medium"
          />

          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-ayur-stone text-ayur-forest hover:bg-ayur-forest hover:text-white"
            }`}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 text-ayur-muted hover:text-ayur-slate rounded-full hover:bg-ayur-stone"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Voice listening status banner */}
        {isListening && (
          <div className="bg-red-50 text-red-700 px-6 py-3 text-xs font-semibold flex items-center justify-between border-b border-red-100">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Listening... Speak now (e.g., "Show me products for digestion")
            </span>
          </div>
        )}

        {/* Search Results & Popular Searches */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {isSearching ? (
            <div className="flex items-center justify-center py-12 text-ayur-forest gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm font-medium">Searching AyurRaksha database...</span>
            </div>
          ) : query.trim() ? (
            <div>
              {/* Products Section */}
              {results.products.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-forest mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-ayur-gold" /> Products ({results.products.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2.5 rounded-ayur border border-ayur-border hover:border-ayur-forest hover:bg-ayur-cream/50 transition-all group"
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-ayur-stone shrink-0">
                          <Image
                            src={product.images[0]?.src || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/${product.slug}`}
                            onClick={onClose}
                            className="font-medium text-xs text-ayur-slate hover:text-ayur-forest line-clamp-1 block"
                          >
                            {product.name}
                          </Link>
                          <div className="text-xs font-bold text-ayur-forest mt-0.5">
                            ₹{product.price}{" "}
                            {product.on_sale && (
                              <span className="line-through text-ayur-muted text-[10px] ml-1">
                                ₹{product.regular_price}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            addItem(product, 1);
                            onClose();
                          }}
                          className="text-[11px] bg-ayur-forest text-white px-2.5 py-1 rounded hover:bg-ayur-deep shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories & Health Concerns */}
              {results.healthConcerns.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-forest mb-2">
                    Matching Health Concerns
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.healthConcerns.map((hc, idx) => (
                      <Link
                        key={idx}
                        href={`/shop?healthConcern=${encodeURIComponent(hc)}`}
                        onClick={onClose}
                        className="bg-ayur-stone hover:bg-ayur-forest hover:text-white text-ayur-slate text-xs px-3 py-1.5 rounded-full transition-colors"
                      >
                        {hc}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Articles */}
              {results.blogs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-forest mb-2">
                    Ayurvedic Journal Articles
                  </h4>
                  <div className="space-y-2">
                    {results.blogs.map((b, idx) => (
                      <Link
                        key={idx}
                        href={`/blog/${b.slug}`}
                        onClick={onClose}
                        className="block p-3 rounded-ayur bg-ayur-cream hover:bg-ayur-stone transition-colors"
                      >
                        <div className="text-xs font-semibold text-ayur-slate">{b.title}</div>
                        <div className="text-[11px] text-ayur-muted line-clamp-1 mt-0.5">{b.excerpt}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.products.length === 0 &&
                results.healthConcerns.length === 0 &&
                results.blogs.length === 0 && (
                  <div className="text-center py-10 text-ayur-muted">
                    <p className="text-sm">No products or articles found matching "{query}".</p>
                    <p className="text-xs mt-1">Try typing "triphala", "ashwagandha", "joint", or "digestion".</p>
                  </div>
                )}
            </div>
          ) : (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-muted mb-3">
                Popular Ayurvedic Searches
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Digestive Detox", "Joint & Knee Care", "KSM-66 Ashwagandha", "Himalayan Shilajit", "Kumkumadi Glow", "Stress & Sleep"].map(
                  (term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(term)}
                      className="bg-ayur-stone hover:bg-ayur-forest hover:text-white text-ayur-slate text-xs px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>{term}</span>
                      <ArrowRight className="w-3 h-3 text-ayur-gold" />
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
