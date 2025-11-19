"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/hooks/useTheme';
import { themes } from '@/config/themes';
import { Palette } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = themes.find((t) => t.value === theme);

  // Prevent SSR issues
  if (!mounted) {
    return (
      <div className="fixed bottom-10 right-10 z-50">
        <div className="flex items-center justify-center rounded-full bg-primary p-4 shadow-2xl">
          <Palette className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground shadow-2xl transition-all hover:scale-110 hover:shadow-primary/50"
        aria-label="Toggle theme menu"
      >
        <Palette className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 z-50 w-72 rounded-xl border border-border bg-card p-3 shadow-xl backdrop-blur-md"
            >
              <div className="mb-2 px-2 py-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Choose Theme
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select your preferred color scheme
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={`group relative overflow-hidden rounded-lg border-2 p-3 text-left transition-all ${
                      theme === themeOption.value
                        ? 'border-primary shadow-md'
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    {/* Theme Preview */}
                    <div className="mb-2 flex gap-1.5">
                      <div
                        className="h-6 w-6 rounded-md shadow-sm"
                        style={{ backgroundColor: themeOption.preview.background }}
                      />
                      <div
                        className="h-6 w-6 rounded-md shadow-sm"
                        style={{ backgroundColor: themeOption.preview.primary }}
                      />
                      <div
                        className="h-6 w-6 rounded-md shadow-sm"
                        style={{ backgroundColor: themeOption.preview.accent }}
                      />
                    </div>

                    {/* Theme Info */}
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {themeOption.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {themeOption.description}
                        </p>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {theme === themeOption.value && (
                      <motion.div
                        layoutId="selected"
                        className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
