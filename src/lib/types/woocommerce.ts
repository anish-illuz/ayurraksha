import { ACFProductFields } from "./acf";

export interface ProductCategory {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  image?: {
    src: string;
    alt?: string;
  };
}

export interface ProductReview {
  id: number | string;
  date_created: string;
  reviewer: string;
  reviewer_email?: string;
  review: string;
  rating: number;
  verified: boolean;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  permalink?: string;
  type?: string;
  status?: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku?: string;
  price: number;
  regular_price: number;
  sale_price?: number;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  total_sales?: number;
  average_rating: number;
  rating_count: number;
  categories: ProductCategory[];
  images: Array<{ id?: number; src: string; alt?: string }>;
  attributes?: ProductAttribute[];
  acf?: ACFProductFields;
  reviews?: ProductReview[];
}

export interface SearchResult {
  products: Product[];
  categories: ProductCategory[];
  healthConcerns: string[];
  blogs: Array<{ title: string; slug: string; excerpt: string }>;
}
