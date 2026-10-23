// Live WordPress REST shapes (wp/v2 + wc/store/v1), mapped into the app's
// Product / BlogPost models by the API layer in ../api.

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string; raw?: string };
  excerpt: { rendered: string; protected: boolean };
  content: { rendered: string; protected: boolean };
  status: string;
  author: number;
  featured_media?: number;
  link: string;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    author?: Array<{ id: number; name: string; avatar_urls?: Record<string, string> }>;
    "wp:term"?: Array<
      Array<{ id: number; name: string; slug: string; link?: string }>
    >;
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url?: string;
      media_details?: { source_url?: string };
      meta?: { image_meta?: Array<{ source_url?: string }> };
      alt?: string;
      caption?: string;
    }>;
  };
}

export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  link?: string;
}

export interface WcStorePrices {
  price: string;
  regular_price: string;
  sale_price?: string | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
}

export interface WcStoreProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  sku?: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: WcStorePrices;
  average_rating: number;
  review_count: number;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  stock_availability?: { text: string; class: string };
  images: Array<{
    id: number;
    src: string;
    name?: string;
    alt?: string;
    thumbnail?: string;
  }>;
  categories?: Array<{ id: number; name: string; slug: string; link?: string }>;
  tags?: Array<{ id: number; name: string; slug: string; link?: string }>;
  attributes?: Array<{
    id: number;
    name: string;
    slug: string;
    visible: boolean;
    options: string[];
  }>;
  variations?: number[];
  has_options: boolean;
  meta?: unknown;
}

export interface WcStoreCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  image?: { id: number; src: string; alt: string } | null;
  parent?: number;
}

/** Rank Math headless endpoint response: its full rendered <head> HTML. */
export interface RankMathHead {
  success: boolean;
  head: string;
}
