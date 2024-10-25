import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartWithProducts: [],
      loginId: null,

      setCartWithProducts: (products) => {
        set({ cartWithProducts: products });
      },

      setLoginId: (id) => {
        set({ loginId: id });
      },

      clearCart: () => {
        set({ cartWithProducts: [], loginId: null });
      },

      updateCartItem: (productId, quantity) => {
        set((state) => ({
          cartWithProducts: state.cartWithProducts.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      removeCartItem: (productId) => {
        set((state) => ({
          cartWithProducts: state.cartWithProducts.filter(
            (item) => item.productId !== productId
          ),
        }));
      },

      getCartItemCount: () => {
        return get().cartWithProducts.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().cartWithProducts.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);