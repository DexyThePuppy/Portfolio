import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type TabType = 'about' | 'gallery' | 'kinks' | 'tech' | 'socials' | 'platforms' | 'settings';

const VALID_TABS: TabType[] = ['about', 'gallery', 'kinks', 'tech', 'socials', 'platforms', 'settings'];

const getTabFromHash = (): TabType | null => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.replace('#', '');
  return VALID_TABS.includes(hash as TabType) ? (hash as TabType) : null;
};

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Deep linking: #gallery, #tech, etc. select the tab on load
  const [activeTab, setActiveTabState] = useState<TabType>(() => getTabFromHash() ?? 'gallery');

  const setActiveTab = useCallback((tab: TabType) => {
    setActiveTabState(tab);
    // replaceState avoids polluting browser history with every tab switch
    window.history.replaceState(null, '', `#${tab}`);
  }, []);

  // Keep tab in sync when the user edits the hash or navigates history
  useEffect(() => {
    const onHashChange = () => {
      const tab = getTabFromHash();
      if (tab) setActiveTabState(tab);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
