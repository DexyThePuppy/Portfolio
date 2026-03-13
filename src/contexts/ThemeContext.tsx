import React, { createContext, useContext, useCallback, useState } from 'react';
import { applyMaterialExpressiveTheme } from '../utils/materialExpressiveTheme';

const STORAGE_KEY = 'md3-tint';
const DEFAULT_TINT = '#FF8A80';

export const TINT_PRESETS: { name: string; hex: string }[] = [
  { name: 'Coral', hex: '#FF8A80' },
  { name: 'Amber', hex: '#FFB74D' },
  { name: 'Teal', hex: '#4DD0E1' },
  { name: 'Blue', hex: '#64B5F6' },
  { name: 'Violet', hex: '#B39DDB' },
  { name: 'Mint', hex: '#81C784' },
  { name: 'Orange', hex: '#FF8A65' },
  { name: 'Indigo', hex: '#7986CB' },
];

function loadStoredTint(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && /^#[0-9A-Fa-f]{6}$/.test(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_TINT;
}

function applyTint(sourceColor: string) {
  applyMaterialExpressiveTheme({ sourceColor, isDark: true });
}

interface ThemeContextType {
  sourceColor: string;
  setSourceColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sourceColor, setSourceColorState] = useState(loadStoredTint);

  const setSourceColor = useCallback((color: string) => {
    const hex = color.startsWith('#') ? color : `#${color}`;
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    setSourceColorState(hex);
    localStorage.setItem(STORAGE_KEY, hex);
    applyTint(hex);
  }, []);

  return (
    <ThemeContext.Provider value={{ sourceColor, setSourceColor }}>
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

/** Call before React mounts to apply stored tint on first paint */
export function applyStoredTheme(): void {
  applyTint(loadStoredTint());
}
