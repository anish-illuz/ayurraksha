import { Product, SearchResult, ProductCategory } from "../types/woocommerce";
import { MOCK_PRODUCTS, HEALTH_CONCERNS } from "../mock/data";
import { fetchAllPages, fetchJson, isLiveApiConfigured } from "./client";
import { WcStoreProduct } from "../types/wordpress";
import { getBlogPosts } from "./blog";
import { getCategories } from "./categories";

// ── WooCommerce Store API (public, no auth for reads) ──────────────────────
// Prices come back as minor-unit strings (paise for INR, currency_minor_unit=2),
// so 129900 → ₹1299.00. Convert to rupees on the way in.

function paiseToRupees(value: string | number | undefined, minorUnit = 2): number {
  if (value === undefined || value === null || value === "") return 0;
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.round(num / 10 ** minorUnit);
}

function toProduct(raw: WcStoreProduct): Product {
  const prices = raw.prices ?? { price: "0", regular_price: "0", currency_minor_unit: 2 };
  const minor = prices.currency_minor_unit ?? 2;
  const price = paiseToRupees(prices.price, minor);
  const regularPrice = paiseToRupees(prices.regular_price, minor);
  const salePriceRaw = prices.sale_price;

  const stock = raw.stock_availability?.class || "";
  const stockStatus: Product["stock_status"] =
    raw.is_in_stock || stock.includes("instock")
      ? "instock"
      : raw.is_on_backorder || stock.includes("backorder")
      ? "onbackorder"
      : "outofstock";

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    permalink: raw.permalink,
    type: raw.type,
    status: "publish",
    sku: raw.sku,
    featured: false, // Store API has no public "featured" flag; keep the app flag
    description: raw.description,
    short_description: raw.short_description,
    price,
    regular_price: regularPrice || price,
    sale_price: salePriceRaw ? paiseToRupees(salePriceRaw, minor) : undefined,
    on_sale: Boolean(raw.on_sale && salePriceRaw),
    stock_status: stockStatus,
    average_rating: raw.average_rating ?? 0,
    rating_count: raw.review_count ?? 0,
    categories: (raw.categories ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })),
    images: (raw.images ?? []).map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt || img.name,
    })),
    attributes: raw.attributes,
    reviews: [], // Store API does not expose reviews publicly; UI degrades gracefully
    acf: undefined, // ACF fields are not public via the Store API; detail sections degrade
  };
}

async function getLiveProducts(): Promise<Product[]> {
  const raw = await fetchAllPages<WcStoreProduct>(
    "wc/store/v1/products?per_page=100&orderby=popularity",
    3600
  );
  if (raw.length === 0) return [];
  return raw.map(toProduct);
}

/**
 * All catalog products. Live first; falls back to the mock catalog when the
 * WP API is unconfigured or unreachable so local/static builds keep working.
 */
export async function getLiveProductsOnly(): Promise<Product[]> {
  if (!isLiveApiConfigured()) return [];
  return getLiveProducts();
}

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const products = await getProductsBase();
  return filterProducts(products, params);
}

async function getProductsBase(): Promise<Product[]> {
  const live = await getLiveProductsOnly();
  if (live.length > 0) return live;
  return MOCK_PRODUCTS;
}

export interface GetProductsParams {
  category?: string;
  healthConcern?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "popularity" | "newest";
  featured?: boolean;
}

export function filterProducts(products: Product[], params: GetProductsParams = {}): Product[] {
  let result = [...products];

  if (params.category) {
    result = result.filter((p) =>
      p.categories.some((c) => c.slug === params.category || String(c.id) === params.category)
    );
  }

  if (params.healthConcern) {
    const q = params.healthConcern.toLowerCase();
    // Live products have no public ACF health_concerns; match name/description/categories.
    result = result.filter((p) =>
      p.acf?.health_concerns?.some((hc) => hc.toLowerCase().includes(q)) ||
      p.categories.some((c) => c.name.toLowerCase().includes(q)) ||
      p.name.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q)
    );
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        p.acf?.ingredients?.some((ing) => ing.name.toLowerCase().includes(q))
    );
  }

  if (params.minPrice !== undefined) {
    result = result.filter((p) => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= params.maxPrice!);
  }

  if (params.featured) {
    result = result.filter((p) => p.featured);
  }

  switch (params.sortBy) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.average_rating - a.average_rating);
      break;
    case "popularity":
      result.sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
      break;
    case "newest":
      result.sort((a, b) => String(b.id).localeCompare(String(a.id), "en", { numeric: true }));
      break;
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isLiveApiConfigured()) {
    const live = await fetchJson<WcStoreProduct[]>(
      `wc/store/v1/products?slug=${encodeURIComponent(slug)}&per_page=1`
    );
    // A miss on the live API is a real 404 — do NOT fall back to a mock slug.
    return live && live.length > 0 ? toProduct(live[0]) : null;
  }
  const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return found ?? MOCK_PRODUCTS[0] ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProductsBase();
  const featured = filterProducts(products, { featured: true });
  return (featured.length > 0 ? featured : products).slice(0, 4);
}

export async function getRelatedProducts(productId: string | number): Promise<Product[]> {
  const products = await getProductsBase();
  const current = products.find((p) => String(p.id) === String(productId));
  if (!current) return products.slice(0, 4);
  return products.filter((p) => String(p.id) !== String(productId)).slice(0, 4);
}

export async function getFrequentlyBoughtTogether(productId: string | number): Promise<Product[]> {
  const products = await getProductsBase();
  const current = products.find((p) => String(p.id) === String(productId) || p.slug === productId);
  if (!current) return products.slice(0, 3);

  if (current.acf?.frequently_bought_together && current.acf.frequently_bought_together.length > 0) {
    const fbtProducts = products.filter((p) =>
      current.acf?.frequently_bought_together?.includes(p.slug) ||
      current.acf?.frequently_bought_together?.includes(String(p.id))
    );
    if (fbtProducts.length > 0) return [current, ...fbtProducts];
  }

  const others = products.filter((p) => String(p.id) !== String(current.id)).slice(0, 2);
  return [current, ...others];
}

export async function searchProducts(query: string): Promise<SearchResult> {
  if (!query || query.trim().length === 0) {
    return { products: [], categories: [], healthConcerns: [], blogs: [] };
  }
  const q = query.toLowerCase().trim();

  const products = filterProducts(await getProductsBase(), { search: query });
  const categories = (await getCategories()).filter(
    (c) => c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
  );
  const healthConcerns = HEALTH_CONCERNS.filter((hc) => hc.name.toLowerCase().includes(q)).map(
    (hc) => hc.name
  );
  const blogs = (await getBlogPosts()).filter(
    (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
  )
    .slice(0, 5)
    .map((b) => ({ title: b.title, slug: b.slug, excerpt: b.excerpt }));

  return { products, categories, healthConcerns, blogs };
}

// Categories are fetched in ./categories.ts (public WooCommerce Store API,
// falling back to the mock catalog). Search uses that same live list.
