import React, { useState, useRef, useEffect } from 'react';
import {
  PhotoIcon,
  CpuChipIcon,
  GlobeAltIcon,
  Square3Stack3DIcon,
  FireIcon,
  Cog6ToothIcon,
  IdentificationIcon,
} from '@heroicons/react/24/solid';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { useTab, type TabType } from '../contexts/TabContext';
import { Z_INDEX } from '../constants';

interface TabDefinition {
  id: TabType;
  label: string;
  icon: React.ElementType;
  nsfwOnly?: boolean;
}

const TABS: TabDefinition[] = [
  { id: 'about', label: 'About', icon: IdentificationIcon },
  { id: 'gallery', label: 'Gallery', icon: PhotoIcon },
  { id: 'kinks', label: 'Kinks', icon: FireIcon, nsfwOnly: true },
  { id: 'tech', label: 'Hardware', icon: CpuChipIcon },
  { id: 'socials', label: 'Socials', icon: GlobeAltIcon },
  { id: 'platforms', label: 'Platforms', icon: Square3Stack3DIcon },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
];

interface TabButtonProps {
  id: TabType;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: (tab: TabType) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, isActive, onClick, buttonRef }) => {
  const { trigger } = useHapticsWithAudio();

  return (
    <button
      ref={buttonRef}
      role="tab"
      id={`tab-${id}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => {
        trigger('light');
        onClick(id);
      }}
      className={`
        flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0
        ${isActive 
          ? 'bg-[var(--color-primary-muted-strong)] text-primary border border-[var(--color-primary-30)]' 
          : 'bg-on-surface-5 text-on-surface-variant border border-on-surface-10 hover:bg-on-surface-10 hover:text-on-background'
        }
      `}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
};

interface TabNavbarProps {
  nsfwEnabled: boolean;
}

const TabNavbar: React.FC<TabNavbarProps> = ({ nsfwEnabled }) => {
  const { activeTab, setActiveTab } = useTab();
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<TabType, HTMLButtonElement>>(new Map());
  const [isScrollable, setIsScrollable] = useState(false);

  const visibleTabs = TABS.filter((tab) => !tab.nsfwOnly || nsfwEnabled);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollable = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth + 1);
    };

    updateScrollable();

    const observer = new ResizeObserver(updateScrollable);
    observer.observe(el);

    return () => observer.disconnect();
  }, [nsfwEnabled]);

  // Roving tabindex: arrow keys move focus + activate the next/previous tab
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = visibleTabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = -1;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % visibleTabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = visibleTabs.length - 1;
    }

    if (nextIndex === -1) return;
    e.preventDefault();
    const nextTab = visibleTabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  };

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 flex justify-center pointer-events-none"
      style={{ zIndex: Z_INDEX.NAV_BAR }}
      aria-label="Profile sections"
    >
      <div className="profile-glass-panel rounded-2xl w-max max-w-full min-w-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-white/10 pointer-events-auto">
        <div
          ref={scrollRef}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={`tab-navbar-scroll flex flex-nowrap gap-2 px-2 py-2${isScrollable ? ' tab-navbar-scroll--fade' : ''}`}
        >
          {visibleTabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={setActiveTab}
              buttonRef={(el) => {
                if (el) {
                  tabRefs.current.set(tab.id, el);
                } else {
                  tabRefs.current.delete(tab.id);
                }
              }}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TabNavbar;
