import { create } from "zustand";
import { Product } from "../types/woocommerce";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  addBundle: (products: Product[]) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => String(item.product.id) === String(product.id)
      );

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += quantity;
        return { items: updated, isOpen: true };
      }

      return { items: [...state.items, { product, quantity }], isOpen: true };
    });
  },

  addBundle: (products) => {
    products.forEach((product) => {
      get().addItem(product, 1);
    });
    set({ isOpen: true });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => String(item.product.id) !== String(productId)),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        String(item.product.id) === String(productId) ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));
