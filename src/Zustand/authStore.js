import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userId: null,
      username: null,
      pendingCartProduct: null,
      setAuth: (token, userId, username) => 
        set({ token, userId, username }),
      setPendingCartProduct: (product) => 
        set({ pendingCartProduct: product }),
      logout: () => 
        set({ token: null, userId: null, username: null, pendingCartProduct: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;