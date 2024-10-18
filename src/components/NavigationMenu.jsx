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
    <div className="w-full bg-white p-3 sm:p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-bold">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <div
              className="text-gray-500 text-center mb-2 sm:mb-0 cursor-pointer"
              onClick={() => handleNavigation(item.path)}
            >
              <span
                className={`${location.pathname === item.path ? 'font-extrabold text-red-500' : 'font-bold'}`}
              >
                {item.label}
              </span>
            </div>
            {index < menuItems.length - 1 && (
              <span className="hidden sm:inline text-gray-300 mx-2">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;