import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id)
        if (existingItem) {
          return {
            cart: state.cart.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          }
        } else {
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateQuantity: (productId, newQuantity) => set((state) => ({
        cart: state.cart.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
)

export default useStore;