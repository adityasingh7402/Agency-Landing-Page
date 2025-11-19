"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType, defaultTheme, getThemeByValue } from '@/config/themes';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage after mount (SSR safe)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && ['light', 'dark', 'red', 'blue', 'purple', 'green'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Apply theme class to html element
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const themeConfig = getThemeByValue(theme);
    
    // Remove all theme classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-red', 'theme-blue', 'theme-purple', 'theme-green', 'dark');
    
    // Add new theme class
    root.classList.add(themeConfig.cssClass);
    
    // Add 'dark' class for compatibility if not light theme
    if (theme !== 'light') {
      root.classList.add('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
