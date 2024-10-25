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

// Context and Store definitions remain the same
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

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: useAuthStore.getState().token,
    username: useAuthStore.getState().username,
    userId: useAuthStore.getState().userId
  });

  useEffect(() => {
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const auth = useAuth();
  const authStore = useAuthStore();
  const { clearAuth } = authStore;
  const { clearCart } = useCartStore();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen || isUserMenuOpen) {
        const menu = document.getElementById('mobile-menu');
        const userMenu = document.getElementById('user-menu');
        const menuButton = document.getElementById('menu-button');
        const userButton = document.getElementById('user-button');

        if (menu && !menu.contains(event.target) && !menuButton?.contains(event.target)) {
          setIsMenuOpen(false);
        }
        if (userMenu && !userMenu.contains(event.target) && !userButton?.contains(event.target)) {
          setIsUserMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('loginAs');
    
    clearAuth();
    clearCart();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    toast.success(isTamil ? 'வெற்றிகரமாக வெளியேறினீர்கள்' : 'Successfully logged out');
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

  const MobileUserMenu = () => (
    <div
      id="user-menu"
      className={`
        fixed right-0 top-16 w-64 bg-white shadow-lg rounded-l-lg transform transition-transform duration-300 ease-in-out z-50
        ${isUserMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="py-2">
        {(auth.username || authStore.username) && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {t.welcome}, {auth.username || authStore.username}
            </p>
          </div>
        )}
        <div className="space-y-1">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-3 text-gray-500" />
              {t.profile}
            </div>
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <div className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-500" />
              {t.orders}
            </div>
          </Link>
          <Link
            to="/address"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <div className="flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-3 text-gray-500" />
              {t.address}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 mr-3" />
              {t.logout}
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div
      id="mobile-menu"
      className={`
        fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t.headerText}</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block px-4 py-2 text-sm rounded-lg transition-colors
                  ${location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-gray-200">
            <Link
              to="/donation"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <CreditCardIcon className="h-5 w-5 mr-3 text-gray-500" />
              {t.donate}
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-500" />
              {t.cart}
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-gray-500">{isTamil ? 'த' : 'En'}</span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="switch"
              aria-checked={isTamil}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${isTamil ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
            <span className="text-sm text-gray-500">{isTamil ? 'En' : 'த'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="bg-blue-900 text-white">
      <div className="h-16 flex items-center justify-between px-4">
        <button
          id="menu-button"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsUserMenuOpen(false);
          }}
          className="p-2 rounded-md text-white hover:bg-blue-800"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center flex-1 justify-center">
          <img
            src={mediaData.headerImages.scoutLogo}
            alt="Scout Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-sm font-semibold mx-2 text-center">
            {isTamil ? "பாரத சாரணியர் & வழிகாட்டுநர்" : "Bharat Scouts and Guides"}
          </h1>
          <img
            src={mediaData.headerImages.tnLogo}
            alt="TN Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        <button
          id="user-button"
          onClick={() => {
            setIsUserMenuOpen(!isUserMenuOpen);
            setIsMenuOpen(false);
          }}
          className="p-2 rounded-md text-white hover:bg-blue-800"
        >
          <UserIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
  const DesktopHeader = () => (
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
              <ul className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.path}>
                    <li className="h-8 flex items-center">
                      <Link
                        to={item.path}
                        className={`text-sm hover:text-blue-600 whitespace-nowrap px-3 py-1 rounded-md transition-colors ${
                          location.pathname === item.path 
                            ? 'text-blue-600 font-bold bg-blue-50' 
                            : 'text-gray-700 font-medium hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                    {index < navItems.length - 1 && (
                      <li className="text-gray-300">/</li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mr-24">
              <Link 
                to="/donation" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={t.donate}
              >
                <CreditCardIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
              </Link>
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={t.cart}
              >
                <ShoppingBagIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title={auth.token ? t.profile : t.login}
                >
                  <UserIcon className="h-5 w-5 text-red-700 hover:text-blue-600" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    {auth.token ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          {t.welcome}, {auth.username}
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t.profile}
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t.orders}
                        </Link>
                        <Link
                          to="/address"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t.address}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          {t.logout}
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t.login}
                      </Link>
                    )}
                  </div>
                )}
              </div>
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
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileMenu />
          <MobileUserMenu />
        </>
      ) : (
        <DesktopHeader />
      )}
    </nav>
  );
};

export default Navbar;