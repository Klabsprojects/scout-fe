import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';

const NavigationMenu = () => {
  const { isTamil } = useTranslation();
  const location = useLocation(); // Get the current location to determine active link

  // Define the menu items
  const menuItems = [
    { path: '/whoweare', label: isTamil ? 'முகப்பு' : 'Home' },
    { path: '/scout-education', label: isTamil ? 'ஆராய்ச்சி கல்வி' : 'Scout Education' },
    { path: '/scout-method', label: isTamil ? 'ஆராய்ச்சி முறை' : 'Scout Method' },
    { path: '/scout-promising-law', label: isTamil ? 'ஆராய்ச்சி உத்திகள்' : 'Scout Promising and Law' },
    { path: '/scouting-history', label: isTamil ? 'ஆராய்ச்சியின் வரலாறு' : 'Scouting History' },
  ];

  return (
    <div className="w-full bg-white p-2 sm:p-4">
      <div className={`flex flex-col sm:flex-row justify-between max-w-3xl mx-auto text-xs sm:text-sm md:text-base`}>
        {menuItems.map((item) => (
          <div key={item.path} className={`text-gray-500 text-center mb-2 sm:mb-0 sm:mr-4`}>
            <Link
              to={item.path}
              className={`text-gray-500 ${location.pathname === item.path ? 'font-bold text-red-500' : ''}`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;