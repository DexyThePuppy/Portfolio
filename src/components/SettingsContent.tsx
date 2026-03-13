import React from 'react';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { useNSFW } from '../contexts/NSFWContext';
import { useTheme, TINT_PRESETS } from '../contexts/ThemeContext';
import { ShieldCheckIcon, ServerStackIcon, TrashIcon, SwatchIcon } from '@heroicons/react/24/solid';

const settingsCard =
  'bg-surface-container-high rounded-xl overflow-hidden border border-[var(--color-primary-muted)] shadow-sm';

const settingsHeader = 'flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant';

const settingsRow =
  'flex items-center gap-2 py-1 px-3 rounded-lg transition-all duration-200 hover:bg-on-surface-10';

/**
 * Settings content – KinksTable-style cards (no expander).
 */
const SettingsContent: React.FC = () => {
  const { nsfwEnabled, setNsfwEnabled, setHasConsented } = useNSFW();
  const { sourceColor, setSourceColor } = useTheme();
  const { trigger } = useHapticsWithAudio();

  const clearCache = () => {
    trigger('light');
    window.location.reload();
  };

  const clearCookies = () => {
    trigger('medium');
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    setHasConsented(false);
    window.location.reload();
  };

  return (
    <div className="space-y-3">
      {/* Appearance */}
      <div className={settingsCard}>
        <div className={settingsHeader}>
          <SwatchIcon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-on-surface">Appearance</h3>
        </div>
        <div className="px-2 pb-2 pt-2">
          <div className={`${settingsRow} flex-wrap gap-2`}>
            {TINT_PRESETS.map((preset) => (
              <button
                key={preset.hex}
                onClick={() => {
                  trigger('light');
                  setSourceColor(preset.hex);
                }}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 flex-shrink-0 ${
                  sourceColor.toLowerCase() === preset.hex.toLowerCase()
                    ? 'border-on-surface ring-2 ring-primary/50'
                    : 'border-transparent hover:border-on-surface-20'
                }`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={settingsCard}>
        <div className={settingsHeader}>
          {nsfwEnabled ? <span className="text-lg">🔞</span> : <ShieldCheckIcon className="w-4 h-4 text-secondary" />}
          <h3 className="text-sm font-semibold text-on-surface">Content</h3>
        </div>
        <div className="px-2 pt-1 pb-1.5 space-y-0.5">
          <div className={`${settingsRow} justify-between`}>
            <span className="text-sm text-on-surface">NSFW Content</span>
            <button
              onClick={() => {
                trigger('medium');
                setNsfwEnabled(!nsfwEnabled);
              }}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                nsfwEnabled ? 'bg-primary' : 'bg-on-surface-10'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  nsfwEnabled ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Debug */}
      <div className={settingsCard}>
        <div className={settingsHeader}>
          <h3 className="text-sm font-semibold text-on-surface">Debug</h3>
          <span className="text-xs text-on-surface-variant">(2)</span>
        </div>
        <div className="px-2 pt-1 pb-1.5 space-y-0.5">
          <button
            onClick={clearCache}
            className={`${settingsRow} w-full text-left`}
          >
            <ServerStackIcon className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-on-surface flex-1">Clear Cache</span>
            <span className="text-xs text-on-surface-variant">Reload page</span>
          </button>
          <button
            onClick={clearCookies}
            className={`${settingsRow} w-full text-left bg-on-surface-5 hover:bg-red-500/10`}
          >
            <TrashIcon className="w-4 h-4 text-error flex-shrink-0" />
            <span className="text-sm text-on-surface flex-1">Clear Cookies</span>
            <span className="text-xs text-on-surface-variant">Reset preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
