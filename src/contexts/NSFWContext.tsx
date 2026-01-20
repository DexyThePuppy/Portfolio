import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface NSFWContextType {
  nsfwEnabled: boolean;
  setNsfwEnabled: (enabled: boolean) => void;
  hasConsented: boolean;
  setHasConsented: (consented: boolean) => void;
  showConsentPopup: boolean;
  setShowConsentPopup: (show: boolean) => void;
}

const NSFWContext = createContext<NSFWContextType | undefined>(undefined);

const COOKIE_NAME = 'nsfw_consent';
const COOKIE_EXPIRY_DAYS = 365;

// Cookie utilities
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const NSFWProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nsfwEnabled, setNsfwEnabledState] = useState(false);
  const [hasConsented, setHasConsentedState] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  // Load consent state from cookies on mount
  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (consent !== null) {
      setHasConsentedState(true);
      setNsfwEnabledState(consent === 'enabled');
    } else {
      // Show popup if no consent cookie exists
      setShowConsentPopup(true);
    }
  }, []);

  const setNsfwEnabled = useCallback((enabled: boolean) => {
    setNsfwEnabledState(enabled);
    setCookie(COOKIE_NAME, enabled ? 'enabled' : 'disabled', COOKIE_EXPIRY_DAYS);
    setHasConsentedState(true);
    setShowConsentPopup(false);
  }, []);

  const setHasConsented = useCallback((consented: boolean) => {
    setHasConsentedState(consented);
    if (!consented) {
      // Clear cookie if consent is revoked
      setCookie(COOKIE_NAME, '', -1);
    }
  }, []);

  return (
    <NSFWContext.Provider
      value={{
        nsfwEnabled,
        setNsfwEnabled,
        hasConsented,
        setHasConsented,
        showConsentPopup,
        setShowConsentPopup,
      }}
    >
      {children}
    </NSFWContext.Provider>
  );
};

export const useNSFW = (): NSFWContextType => {
  const context = useContext(NSFWContext);
  if (context === undefined) {
    throw new Error('useNSFW must be used within a NSFWProvider');
  }
  return context;
};
