import { create } from "zustand";

interface WishlistStore {
  wishlistIds: string[];
  toggleWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlistIds: ["prod-1", "prod-4"],
  toggleWishlist: (productId) => {
    const id = String(productId);
    set((state) => {
      const exists = state.wishlistIds.includes(id);
      if (exists) {
        return { wishlistIds: state.wishlistIds.filter((item) => item !== id) };
      } else {
        return { wishlistIds: [...state.wishlistIds, id] };
      }
    });
  },
  isInWishlist: (productId) => {
    return get().wishlistIds.includes(String(productId));
  },
}));
