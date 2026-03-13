import React from 'react';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { useNSFW } from '../contexts/NSFWContext';
import { useTab } from '../contexts/TabContext';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

/**
 * Floating settings button – switches to the Settings tab in the main container.
 */
const NSFWToggle: React.FC = () => {
  const { hasConsented } = useNSFW();
  const { setActiveTab, activeTab } = useTab();
  const { trigger } = useHapticsWithAudio();

  if (!hasConsented) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => {
          trigger('light');
          setActiveTab('settings');
        }}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          bg-surface-container-highest border border-[var(--color-primary-muted-strong)]
          hover:border-[var(--color-primary-40)] hover:bg-[var(--color-primary-muted)]
          transition-all duration-200 shadow-lg shadow-black/30
          ${activeTab === 'settings' ? 'rotate-90' : 'rotate-0'}
        `}
        title="Settings"
      >
        <Cog6ToothIcon className="w-6 h-6 text-on-surface/70" />
      </button>
    </div>
  );
};

export default NSFWToggle;
