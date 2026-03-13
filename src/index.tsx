import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyStoredTheme } from './contexts/ThemeContext';
import './index.css';
import App from './App';

// Apply stored tint before first paint
applyStoredTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 