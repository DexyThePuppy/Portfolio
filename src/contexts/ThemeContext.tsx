import React, { createContext, useContext, useCallback } from 'react';
import { applyMaterialExpressiveTheme } from '../utils/materialExpressiveTheme';
import type { TabType } from './TabContext';

export const TAB_COLORS: Record<TabType, string> = {
  about: '#FF8A80',
  gallery: '#64B5F6',
  kinks: '#B39DDB',
  tech: '#4DD0E1',
  socials: '#7986CB',
  platforms: '#81C784',
  settings: '#FFB74D',
};

function applyTint(sourceColor: string) {
  applyMaterialExpressiveTheme({ sourceColor, isDark: true });
}

interface ThemeContextType {
  applyTabTheme: (tab: TabType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const applyTabTheme = useCallback((tab: TabType) => {
    applyTint(TAB_COLORS[tab]);
  }, []);

  return (
    <ThemeContext.Provider value={{ applyTabTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/** Call before React mounts to apply the default tab tint on first paint */
export function applyStoredTheme(): void {
  applyTint(TAB_COLORS.gallery);
}
