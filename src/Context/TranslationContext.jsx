// TranslationContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [isTamil, setIsTamil] = useState(() => {
    // Initialize from localStorage, default to false if not found
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage === 'tamil';
  });

  const toggleLanguage = () => {
    setIsTamil(prev => !prev);
  };

  // Update localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', isTamil ? 'tamil' : 'english');
  }, [isTamil]);

  return (
    <TranslationContext.Provider value={{ isTamil, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};