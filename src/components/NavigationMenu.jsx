import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';

const NavigationMenu = () => {
  const { isTamil } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/whoweare', label: isTamil ? 'முகப்பு' : 'Home' },
    { path: '/scout-education', label: isTamil ? 'ஆராய்ச்சி கல்வி' : 'Scout Education' },
    { path: '/scout-method', label: isTamil ? 'ஆராய்ச்சி முறை' : 'Scout Method' },
    { path: '/scout-promising-law', label: isTamil ? 'ஆராய்ச்சி உத்திகள்' : 'Scout Promising and Law' },
    { path: '/scouting-history', label: isTamil ? 'ஆராய்ச்சியின் வரலாறு' : 'Scouting History' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full bg-white p-2 sm:p-4">
      <div className={`flex flex-col sm:flex-row justify-between max-w-3xl mx-auto text-xs sm:text-sm md:text-base`}>
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`text-gray-500 text-center mb-2 sm:mb-0 sm:mr-4 cursor-pointer`}
            onClick={() => handleNavigation(item.path)}
          >
            <span
              className={`${location.pathname === item.path ? 'font-bold text-red-500' : ''}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;