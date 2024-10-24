import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Single source of truth for auth state
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      username: null,
      userId: null,
      pendingCartProduct: null,
      setAuth: (token, userId, username) => {
        console.log('Setting auth:', { token, userId, username }); // Debug log
        set({ token, userId, username });
      },
      clearAuth: () => {
        console.log('Clearing auth'); // Debug log
        set({ token: null, userId: null, username: null });
      },
      setPendingCartProduct: (product) => set({ pendingCartProduct: product }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);