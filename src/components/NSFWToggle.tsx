import React, { useState } from 'react';
import { useNSFW } from '../contexts/NSFWContext';
import { Cog6ToothIcon, ShieldCheckIcon, XMarkIcon, TrashIcon, ServerStackIcon } from '@heroicons/react/24/outline';

const NSFWToggle: React.FC = () => {
  const { nsfwEnabled, setNsfwEnabled, hasConsented, setHasConsented } = useNSFW();
  const [isOpen, setIsOpen] = useState(false);

  if (!hasConsented) return null;

  const clearCache = () => {
    // Clear browser cache by reloading with cache bypass
    window.location.reload();
  };

  const clearCookies = () => {
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Reset consent and reload
    setHasConsented(false);
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-72 bg-[#1a1a1a] rounded-xl border border-[rgb(255,138,128)]/20 shadow-2xl shadow-black/50 overflow-hidden mb-2">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Site Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-white/50" />
              </button>
            </div>

            {/* Content Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-2">
                  {nsfwEnabled ? (
                    <span className="text-lg">🔞</span>
                  ) : (
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                  )}
                  <div>
                    <span className="text-sm text-white font-medium">NSFW Content</span>
                    <p className="text-xs text-white/50">
                      {nsfwEnabled ? 'Showing adult content' : 'Safe mode enabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNsfwEnabled(!nsfwEnabled)}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors duration-200
                    ${nsfwEnabled
                      ? 'bg-[rgb(255,138,128)]'
                      : 'bg-white/20'}
                  `}
                >
                  <span
                    className={`
                      absolute top-1 w-4 h-4 rounded-full bg-white shadow-md
                      transition-transform duration-200
                      ${nsfwEnabled ? 'left-7' : 'left-1'}
                    `}
                  />
                </button>
              </div>

              {/* Debug Options */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <h4 className="text-xs font-medium text-white/70 mb-2">Debug Options</h4>

                <button
                  onClick={clearCache}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-left"
                >
                  <ServerStackIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-white">Clear Cache</span>
                  <span className="text-xs text-white/50 ml-auto">Reload page</span>
                </button>

                <button
                  onClick={clearCookies}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 transition-all text-left"
                >
                  <TrashIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-white">Clear Cookies</span>
                  <span className="text-xs text-white/50 ml-auto">Reset preferences</span>
                </button>
              </div>

              <p className="mt-3 text-xs text-white/30 text-center">
                Changes are saved automatically
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          bg-[#1a1a1a] border border-[rgb(255,138,128)]/20
          hover:border-[rgb(255,138,128)]/40 hover:bg-[rgb(255,138,128)]/10
          transition-all duration-200 shadow-lg shadow-black/30
          ${isOpen ? 'rotate-90' : 'rotate-0'}
        `}
        title="Content Settings"
      >
        <Cog6ToothIcon className="w-6 h-6 text-white/70" />
      </button>
    </div>
  );
};

export default NSFWToggle;
