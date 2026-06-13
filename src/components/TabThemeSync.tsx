import React, { useEffect } from 'react';
import { useTab } from '../contexts/TabContext';
import { useTheme } from '../contexts/ThemeContext';

/** Applies the active tab's tint whenever the tab or tab colors change. */
const TabThemeSync: React.FC = () => {
  const { activeTab } = useTab();
  const { applyTabTheme } = useTheme();

  useEffect(() => {
    applyTabTheme(activeTab);
  }, [activeTab, applyTabTheme]);

  return null;
};

export default TabThemeSync;
