import React from 'react';
import Profile from './components/Profile';
import NSFWConsentPopup from './components/NSFWConsentPopup';
import NSFWToggle from './components/NSFWToggle';
import { NSFWProvider } from './contexts/NSFWContext';
import { sampleProfile } from './data/sampleProfile';

const App: React.FC = () => {
  return (
    <NSFWProvider>
      <div className="App">
        <Profile profile={sampleProfile} />
        <NSFWConsentPopup />
        <NSFWToggle />
      </div>
    </NSFWProvider>
  );
};

export default App;
