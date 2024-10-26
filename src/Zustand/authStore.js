import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Single source of truth for auth state
export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      userId: null,
      pendingCartProduct: null,
      isAuthenticated: false,

      // Set authentication data
      setAuth: (token, userId, username) => {
        console.log('Setting auth:', { token, userId, username }); // Debug log
        set({ 
          token, 
          userId, 
          username,
          isAuthenticated: true 
        });
      },

      // Clear all authentication data
      clearAuth: () => {
        console.log('Clearing auth state completely'); // Debug log
        set({ 
          token: null, 
          userId: null, 
          username: null,
          pendingCartProduct: null,
          isAuthenticated: false
        });
      },

      // Handle pending cart product
      setPendingCartProduct: (product) => {
        console.log('Setting pending cart product:', product); // Debug log
        set({ pendingCartProduct: product });
      },

      // Clear just the pending cart product
      clearPendingCartProduct: () => {
        console.log('Clearing pending cart product'); // Debug log
        set({ pendingCartProduct: null });
      },

      // Getter for checking auth status
      getAuthState: () => {
        const state = get();
        return {
          isAuthenticated: !!state.token,
          username: state.username,
          userId: state.userId,
          pendingCartProduct: state.pendingCartProduct
        };
      },

      // Update user details
      updateUserDetails: (details) => {
        console.log('Updating user details:', details); // Debug log
        set((state) => ({
          ...state,
          ...details
        }));
      },

      // Check if user is authenticated
      checkAuth: () => {
        const state = get();
        return !!state.token;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist essential data
      partialize: (state) => ({
        token: state.token,
        userId: state.userId,
        username: state.username,
        pendingCartProduct: state.pendingCartProduct
      })
    }
  )
);

// Optional: Debug subscribe to state changes
if (process.env.NODE_ENV === 'development') {
  useAuthStore.subscribe(
    (state) => {
      console.log('Auth Store State Changed:', {
        isAuthenticated: !!state.token,
        username: state.username,
        pendingCartProduct: state.pendingCartProduct
      });
    }
  );
}

export default useAuthStore;