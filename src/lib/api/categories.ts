import { ProductCategory } from "../types/woocommerce";
import { MOCK_CATEGORIES, HEALTH_CONCERNS } from "../mock/data";
import { fetchJson, isLiveApiConfigured } from "./client";
import { WcStoreCategory } from "../types/wordpress";

export async function getCategories(): Promise<ProductCategory[]> {
  if (isLiveApiConfigured()) {
    const raw = await fetchJson<WcStoreCategory[]>(
      "wc/store/v1/products/categories?per_page=100",
      3600
    );
    if (raw && raw.length > 0) {
      return raw
        .filter((c) => c.slug !== "uncategorized" && c.slug !== "external")
        .map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          count: c.count,
          image: c.image ? { src: c.image.src, alt: c.image.alt } : undefined,
        }));
    }
  }
  return MOCK_CATEGORIES;
}

/**
 * Curated health-concern navigation (editorial, not a WooCommerce taxonomy).
 * These drive the "Shop by Health Concern" grid; kept in-app as content since
 * the backend models remedies by product category, not health concern.
 */
export async function getHealthConcerns() {
  return HEALTH_CONCERNS;
}
