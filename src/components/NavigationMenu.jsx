// src/components/NavigationMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';

const NavigationMenu = () => {
  const { isTamil } = useTranslation(); // Get the current language state from the context

  return (
    <div className="w-full bg-white p-2 sm:p-4">
      <div className={`flex flex-col sm:flex-row justify-between max-w-3xl mx-auto text-xs sm:text-sm md:text-base`}>
        <div className={`text-blue-600 font-medium border-b-2 border-blue-600 pb-2 text-center ${isTamil ? 'text-sm' : ''} mb-2 sm:mb-0 sm:mr-4`}>
          <Link to="/whoweare">{isTamil ? 'முகப்பு' : 'Home'}</Link>
        </div>
        <div className={`text-gray-500 text-center ${isTamil ? 'text-sm' : ''} mb-2 sm:mb-0 sm:mr-4`}>
          <Link to="/scout-education" className="text-gray-500">{isTamil ? 'ஆராய்ச்சி கல்வி' : 'Scout Education'}</Link>
        </div>
        <div className={`text-gray-500 text-center ${isTamil ? 'text-sm' : ''} mb-2 sm:mb-0 sm:mr-4`}>
          {isTamil ? 'ஆராய்ச்சி முறை' : 'Scout Method'}
        </div>
        <div className={`text-gray-500 text-center ${isTamil ? 'text-sm' : ''} mb-2 sm:mb-0 sm:mr-4`}>
          {isTamil ? 'ஆராய்ச்சி உத்திகள்' : 'Scout Promising and Law'}
        </div>
        <div className={`text-gray-500 text-center ${isTamil ? 'text-sm' : ''}`}>
          {isTamil ? 'ஆராய்ச்சியின் வரலாறு' : 'Scouting History'}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
