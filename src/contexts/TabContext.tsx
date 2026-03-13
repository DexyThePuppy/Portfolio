import React, { createContext, useContext, useState } from 'react';

export type TabType = 'gallery' | 'kinks' | 'tech' | 'socials' | 'platforms' | 'settings';

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('gallery');

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
