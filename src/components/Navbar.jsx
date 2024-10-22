import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import { Link, useLocation } from 'react-router-dom'; 
import mediaData from '../MediaData.json';

const Navbar = () => {
  const { isTamil, toggleLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      officeBearers: "Office Bearers"
    },
    ta: {
      home: "முகப்பு",
      whoWeAre: "நாங்கள்",
      whatWeDo: "என்ன செய்கிறோம்",
      whereWeWork: " இடம்",
      shop: "தொகுப்பு",
      donate: "நன்கொடை",
      cart: "வண்டி",
      login: "உள்நுழைய",
      product: "பொருட்கள்",
      headerText: "பாரத சாரணர் மற்றும் வழிகாட்டிகள்",
      officeBearers: "அலுவலக தாங்கிகள்"
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

  const formatDateTime = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return currentDateTime.toLocaleString('en-US', options);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {isMobile ? (
        <>
          <div className="bg-blue-900 text-white py-4 px-4 flex items-center justify-between">
            <img src={mediaData.headerImages.scoutLogo} alt="Bharat Scouts and Guides Logo" className="h-12 w-12 object-contain" />
            <h1 className={`text-lg ${isTamil ? 'font-bold' : 'font-semibold'}`}>BSG</h1>
            <div className="flex items-center space-x-4">
              <img src={mediaData.headerImages.tnLogo} alt="TN Logo" className="h-12 w-12 object-contain" />
              <button onClick={toggleMenu} className={isTamil ? 'font-bold' : ''}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="bg-white text-black shadow-md py-4 px-4">
              <ul className="flex flex-col space-y-4 mb-4">
                {navItems.map((item) => (
                  <li key={item.path} className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-bold' : 'font-medium'} ${location.pathname === item.path ? 'text-blue-600 font-bold' : ''}`}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-4">
                <Link to="/donation" className="flex flex-col items-center">
                  <img src="/Images/cash.png" alt="Donate" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} hover:underline whitespace-nowrap`}>
                    {t.donate}
                  </span>
                </Link>
                <Link to="/cart" className="flex flex-col items-center">
                  <img src="/Images/cart.png" alt="Cart" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} mt-1`}>
                    {t.cart}
                  </span>
                </Link>
                <Link to="/login" className="flex flex-col items-center">
                  <img src="/Images/login.png" alt="Login Page" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} mt-1`}>
                    {t.login}
                  </span>
                </Link>
              </div>
              <div className="flex items-center justify-center mb-4">
                <span className={`mr-2 text-sm ${isTamil ? 'font-bold' : ''}`}>{isTamil ? 'த' : 'En'}</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={isTamil}
                    onChange={toggleLanguage}
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span className={`text-sm ${isTamil ? 'font-bold' : ''}`}>{isTamil ? 'En' : 'த'}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-blue-900 text-white py-4 md:py-4 lg:py-4">
            <div className="container mx-auto flex items-center justify-between px-4 lg:px-16">
              <div className="w-16 lg:w-24"></div>
              <div className="flex flex-col items-center flex-grow">
                <h1 className={`text-xs lg:text-base ${isTamil ? 'font-bold' : 'font-semibold'} ml-4 lg:ml-2`}>
                  Bharat Scouts and Guides - பாரத சாரணியர் & வழிகாட்டுநர் மாநில தலைமையகம்
                </h1>
                <div className="text-xs lg:text-sm text-yellow-300 mt-1">
                  {formatDateTime()}
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4 mr-4 lg:mr-16">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="languageToggle"
                    className="hidden"
                    checked={isTamil}
                    onChange={toggleLanguage}
                  />
                  <label htmlFor="languageToggle" className="flex items-center cursor-pointer">
                    <div className="relative w-10 lg:w-12 h-5 lg:h-6 rounded-full bg-white border-2 border-gray-400 transition duration-300">
                      <div className={`absolute top-0 left-0 w-4 lg:w-5 h-4 lg:h-5 rounded-full bg-red-500 shadow-md transition-transform duration-300 transform ${isTamil ? 'translate-x-5 lg:translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                    <span className={`ml-2 text-white text-xs lg:text-sm ${isTamil ? 'font-bold' : ''}`}>{isTamil ? 'En' : 'த'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-black shadow-md py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <ul className={`flex flex-wrap lg:justify-start items-center space-x-1 lg:space-x-2 mb-4 lg:mb-0 ${isTamil ? 'lg:ml-28' : 'lg:ml-32'}`}>
                  {navItems.map((item, index) => (
                    <React.Fragment key={item.path}>
                      <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-bold' : 'font-medium'} whitespace-nowrap ${location.pathname === item.path ? 'text-blue-600 font-bold' : ''}`}>
                        <Link to={item.path}>{item.label}</Link>
                      </li>
                      {index < navItems.length - 1 && <li className="text-gray-400 hidden lg:block">/</li>}
                    </React.Fragment>
                  ))}
                </ul>

                <div className={`flex items-center space-x-4 lg:space-x-6 ${isTamil ? 'lg:mr-16' : 'lg:mr-32'}`}>
                  <div className="flex flex-col items-center space-y-1">
                    <Link to="/donation" className="flex flex-col items-center">
                      <img src="/Images/cash.png" alt="Donate" className="h-6 w-6" />
                      <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} hover:underline whitespace-nowrap`}>
                        {t.donate}
                      </span>
                    </Link>
                  </div>
                  <Link to="/cart" className="flex flex-col items-center">
                    <img src="/Images/cart.png" alt="Cart" className="h-6 w-6" />
                    <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} mt-1`}>
                      {t.cart}
                    </span>
                  </Link>
                  <div className="flex flex-col items-center space-y-1">
                    <Link to="/login" className="flex flex-col items-center">
                      <img src="/Images/login.png" alt="Login Page" className="h-6 w-6" />
                      <span className={`text-xs ${isTamil ? 'font-bold' : 'font-medium'} mt-1`}>
                        {t.login}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-2 top-2 z-10">
            <img
              src={mediaData.headerImages.scoutLogo}
              alt="Bharat Scouts and Guides Logo"
              className="h-16 w-16 lg:h-24 lg:w-24 object-contain"
            />
          </div>
          <div className="absolute right-2 top-2 z-10">
            <img
              src={mediaData.headerImages.tnLogo}
              alt="TN Logo"
              className="h-16 w-16 lg:h-24 lg:w-24 object-contain"
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;