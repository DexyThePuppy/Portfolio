import React from 'react';
import Profile from './components/Profile';
import { sampleProfile } from './data/sampleProfile';

const App: React.FC = () => {
  return (
    <div className="App">
      <Profile profile={sampleProfile} />
    </div>
  );
};

export default App;
