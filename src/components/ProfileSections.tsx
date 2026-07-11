import React from 'react';
import { InfoItem, StatCategory } from '../data/profileData';
import { getIconStyles } from '../utils/visualUtils';

// ============================================================================
// STATS SECTION – Card with header
// ============================================================================

interface StatsSectionProps {
  categories: StatCategory[];
  className?: string;
}

const StatCategoryCard: React.FC<{ section: StatCategory; index?: number }> = ({ section, index = 0 }) => {
  return (
    <div
      className="
        fly-in
        bg-surface-container-high rounded-xl overflow-hidden
        border border-[var(--color-primary-muted)]
        shadow-sm
      "
      style={{ ['--fly-i']: index } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
        <h3 className="text-sm font-semibold text-on-surface">{section.category}</h3>
      </div>

      <div className="px-2 pb-1.5 pt-1 space-y-0.5 stagger">
        {section.items.map((item, itemIndex) => {
          const isDarker = itemIndex % 2 === 1;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all duration-200 ${
                isDarker ? 'bg-on-surface-5' : 'bg-transparent'
              } hover:bg-on-surface-10`}
            >
              <div
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
                style={getIconStyles(item.id, item.title)}
              >
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-on-surface flex-1 min-w-0 truncate">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatsSection: React.FC<StatsSectionProps> = React.memo(({ categories, className = 'space-y-3' }) => {
  return (
    <div className={className}>
      {categories.map((section, index) => (
        <StatCategoryCard key={section.category} section={section} index={index} />
      ))}
    </div>
  );
});

StatsSection.displayName = 'StatsSection';

// ============================================================================
// HOBBIES SECTION – KinksTable-style expandable card
// ============================================================================

interface HobbiesSectionProps {
  items: InfoItem[];
  className?: string;
  startIndex?: number;
}

const HobbiesCard: React.FC<{ items: InfoItem[]; startIndex?: number }> = ({ items, startIndex = 0 }) => {
  return (
    <div
      className="
        fly-in
        bg-surface-container-high rounded-xl overflow-hidden
        border border-[var(--color-primary-muted)]
        shadow-sm
      "
      style={{ ['--fly-i']: startIndex } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
        <h3 className="text-sm font-semibold text-on-surface">Hobbies & Skills</h3>
      </div>

      <div className="px-2 pb-1.5 pt-1 space-y-0.5 stagger">
        {items.map((hobby, itemIndex) => {
          const isDarker = itemIndex % 2 === 1;
          return (
            <div
              key={hobby.id}
              className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all duration-200 ${
                isDarker ? 'bg-on-surface-5' : 'bg-transparent'
              } hover:bg-on-surface-10`}
            >
              <div
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
                style={getIconStyles(hobby.id, hobby.title)}
              >
                <hobby.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-on-surface flex-1 min-w-0 truncate">{hobby.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HobbiesSection: React.FC<HobbiesSectionProps> = React.memo(({ items, className, startIndex = 0 }) => {
  return (
    <div className={className}>
      <HobbiesCard items={items} startIndex={startIndex} />
    </div>
  );
});

HobbiesSection.displayName = 'HobbiesSection';
