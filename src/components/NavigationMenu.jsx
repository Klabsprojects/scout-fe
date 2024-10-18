import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';

const NavigationMenu = () => {
  const { isTamil } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/whoweare', label: isTamil ? 'முகப்பு' : 'Home' },
    { path: '/scout-education', label: isTamil ? 'எங்கள் பார்வை' : 'Our Vision' },
    { path: '/scout-method', label: isTamil ? 'ஆராய்ச்சி முறை' : 'Scout Method' },
    { path: '/scout-promising-law', label: isTamil ? 'ஆராய்ச்சி உத்திகள்' : 'Scout Promising and Law' },
    { path: '/scouting-history', label: isTamil ? 'ஆராய்ச்சியின் வரலாறு' : 'Scouting History' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full bg-white p-2 sm:p-3">
      <div className="flex flex-wrap justify-center sm:justify-between items-center max-w-6xl mx-auto text-xs sm:text-sm md:text-base font-bold">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <div
              className="text-gray-500 text-center px-1 py-1 m-0.5 cursor-pointer whitespace-nowrap"
              onClick={() => handleNavigation(item.path)}
            >
              <span
                className={`${location.pathname === item.path ? 'font-extrabold text-red-500' : 'font-bold'}`}
              >
                {item.label}
              </span>
            </div>
            {index < menuItems.length - 1 && (
              <span className="hidden sm:inline text-gray-300 mx-0.5">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;