import React, { useState, useEffect, createContext, useContext } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { ShoppingBagIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../Context/TranslationContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import mediaData from '../MediaData.json';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAuthStore } from '../Zustand/authStore';

const AuthContext = createContext(null);



const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      clearCart: () => set({ cartItems: [] })
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// Auth Provider Component
// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: useAuthStore.getState().token,
    username: useAuthStore.getState().username,
    userId: useAuthStore.getState().userId
  });

  useEffect(() => {
    // Subscribe to auth store changes
    const unsubscribe = useAuthStore.subscribe((state) => {
      setAuthState({
        token: state.token,
        username: state.username,
        userId: state.userId
      });
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const Navbar = () => {
  const { isTamil, toggleLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Update this line to use both context and store
  const auth = useAuth();
  const authStore = useAuthStore();

  // Combine store actions
  const { clearAuth } = authStore;
  const { clearCart } = useCartStore();

  // Add this effect to monitor auth state changes
  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      console.log('Auth state updated:', state); // Debug log
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('loginAs');
    
    // Clear Zustand stores
    clearAuth();
    clearCart();
    
    // Reset UI state
    setIsUserDropdownOpen(false);
    
    // Show success message
    toast.success(isTamil ? 'வெற்றிகரமாக வெளியேறினீர்கள்' : 'Successfully logged out');
    
    // Navigate to home page
    navigate('/');
  };

  const translations = {
    en: {
      home: "Home",
      whoWeAre: "Who we are",
      whatWeDo: "What we do",
      whereWeWork: "Where we work",
      shop: "Gallery",
      donate: "Donate",
      cart: "Cart",
      login: "Login",
      product: "Products",
      headerText: "Bharat Scouts and Guides",
      officeBearers: "Office Bearers",
      profile: "Your Profile",
      orders: "Your Orders",
      address: "Your Address",
      logout: "Logout",
      welcome: "Welcome"
    },
    ta: {
      home: "முகப்பு",
      whoWeAre: "நாங்கள்",
      whatWeDo: "என்ன செய்கிறோம்",
      whereWeWork: "இடம்",
      shop: "தொகுப்பு",
      donate: "நன்கொடை",
      cart: "வண்டி",
      login: "உள்நுழைய",
      product: "பொருட்கள்",
      headerText: "பாரத சாரணர் மற்றும் வழிகாட்டிகள்",
      officeBearers: "அலுவலக தாங்கிகள்",
      profile: "உங்கள் சுயவிவரம்",
      orders: "உங்கள் ஆர்டர்கள்",
      address: "உங்கள் முகவரி",
      logout: "வெளியேறு",
      welcome: "வரவேற்கிறோம்"
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  const navItems = [
    { path: "/ScoutHomepage", label: t.home },
    { path: "/whoweare", label: t.whoWeAre },
    { path: "/what-we-do", label: t.whatWeDo },
    { path: "/where-we-work", label: t.whereWeWork },
    { path: "/office-bearers", label: t.officeBearers },
    { path: "/gallery", label: t.shop },
    { path: "/product", label: t.product },
  ];

  const UserDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        {(auth.username || authStore.username) && (
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            {t.welcome}, {auth.username || authStore.username}
          </div>
        )}
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {t.profile}
        </Link>
        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {t.orders}
        </Link>
        <Link to="/address" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {t.address}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t.logout}
        </button>
      </div>
    </div>
  );

  const MobileUserMenu = () => (
    <div className="border-t border-gray-200 pt-4">
      {auth.username && (
        <div className="py-2 text-sm text-gray-700 border-b">
          {t.welcome}, {auth.username}
        </div>
      )}
      <Link to="/profile" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
        {t.profile}
      </Link>
      <Link to="/orders" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
        {t.orders}
      </Link>
      <Link to="/address" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
        {t.address}
      </Link>
      <button
        onClick={handleLogout}
        className="w-full text-left py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
      >
        <LogOut className="h-4 w-4 mr-2" />
        {t.logout}
      </button>
    </div>
  );

  const AuthButtons = () => {
    // Check both auth context and store
    const isAuthenticated = auth.token || authStore.token;
    const currentUsername = auth.username || authStore.username;

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <UserIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
            </button>
            {isUserDropdownOpen && <UserDropdown />}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1" />
            {t.logout}
          </button>
        </div>
      );
    }
    return (
      <Link to="/login" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
        <UserIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
      </Link>
    );
};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {isMobile ? (
        <>
          <div className="bg-blue-900 text-white py-4 px-4 flex items-center justify-between">
            <img src={mediaData.headerImages.scoutLogo} alt="Bharat Scouts and Guides Logo" className="h-12 w-12 object-contain" />
            <h1 className="text-lg font-semibold">BSG</h1>
            <div className="flex items-center space-x-4">
              <img src={mediaData.headerImages.tnLogo} alt="TN Logo" className="h-12 w-12 object-contain" />
              <button onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="bg-white text-black shadow-md py-4 px-4">
              <ul className="flex flex-col space-y-4 mb-4">
                {navItems.map((item) => (
                  <li key={item.path} className="hover:text-blue-600 cursor-pointer">
                    <Link 
                      to={item.path}
                      className={`text-sm font-medium ${location.pathname === item.path ? 'text-blue-600 font-bold' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end items-center gap-2 pb-4 px-2">
                <Link to="/donation" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <CreditCardIcon className="h-5 w-5 text-gray-700 hover:text-blue-600" />
                </Link>
                <Link to="/cart" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-700 hover:text-blue-600" />
                </Link>
                <AuthButtons />
              </div>
              {auth.token && isUserDropdownOpen && <MobileUserMenu />}
              <div className="flex items-center justify-center">
                <span className="mr-2 text-sm">{isTamil ? 'த' : 'En'}</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={isTamil}
                    onChange={toggleLanguage}
                  />
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
                </div>
                <span className="text-sm">{isTamil ? 'En' : 'த'}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-blue-900 text-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
              <div className="w-24" />
              <h1 className="text-base font-semibold text-center flex-grow px-24">
                Bharat Scouts and Guides - பாரத சாரணியர் & வழிகாட்டுநர் மாநில தலைமையகம்
              </h1>
              <div className="flex items-center mr-28">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="languageToggle"
                    className="hidden"
                    checked={isTamil}
                    onChange={toggleLanguage}
                  />
                  <label htmlFor="languageToggle" className="flex items-center cursor-pointer">
                    <div className="relative w-12 h-6 rounded-full bg-white border-2 border-gray-400">
                      <div className={`absolute top-0 left-0 w-5 h-5 rounded-full bg-red-500 shadow-md transform transition-transform duration-300 ${isTamil ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <span className="ml-2 text-white text-sm">{isTamil ? 'En' : 'த'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-black shadow-md py-4">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 flex justify-center">
                  <ul className="flex items-center">
                    {navItems.map((item, index) => (
                      <React.Fragment key={item.path}>
                        <li className="h-8 flex items-center">
                          <Link
                            to={item.path}
                            className={`text-sm hover:text-blue-600 whitespace-nowrap px-1 ${
                              location.pathname === item.path ? 'text-blue-600 font-bold' : 'font-medium'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                        {index < navItems.length - 1 && (
                          <li className="text-gray-400 mx-0.5">/</li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 mr-24">
                  <Link to="/donation" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <CreditCardIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
                  </Link>
                  <Link to="/cart" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingBagIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
                  </Link>
                  <AuthButtons />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-2 top-2 z-10">
            <img
              src={mediaData.headerImages.scoutLogo}
              alt="Bharat Scouts and Guides Logo"
              className="h-24 w-24 object-contain"
            />
          </div>
          <div className="absolute right-2 top-2 z-10">
            <img
              src={mediaData.headerImages.tnLogo}
              alt="TN Logo"
              className="h-24 w-24 object-contain"
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;