import React from 'react';
import Profile from './components/Profile';
import NSFWConsentPopup from './components/NSFWConsentPopup';
import { NSFWProvider } from './contexts/NSFWContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TabProvider } from './contexts/TabContext';
import { sampleProfile } from './data/sampleProfile';

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <TabProvider>
    <NSFWProvider>
      <div className="App">
        <Profile profile={sampleProfile} />
        <NSFWConsentPopup />
      </div>
    </NSFWProvider>
    </TabProvider>
    </ThemeProvider>
  );
};

export default App;
