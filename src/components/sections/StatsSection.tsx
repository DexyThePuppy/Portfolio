import React from 'react';
import { StatCategory } from '../../data/profileData';

interface StatsSectionProps {
  categories: StatCategory[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ categories }) => {
  // Generate a better hash from string
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  // Random rotations for the icon (default and hover) - ensures they're different
  const getIconStyles = (id: string, title: string) => {
    const seed = hashString(id + title + 'icon');
    const rotation = ((seed * 23) % 16) - 8; // -8 to 8 degrees

    // Ensure hover rotation is noticeably different (at least 8 degrees apart)
    let hoverRotation = ((seed * 41) % 20) - 10;
    const diff = Math.abs(hoverRotation - rotation);
    if (diff < 8) {
      hoverRotation = rotation > 0 ? rotation - 12 : rotation + 12;
    }

    return {
      '--icon-rotation': `${rotation}deg`,
      '--icon-hover-rotation': `${hoverRotation}deg`,
    } as React.CSSProperties;
  };

  return (
    <div className="section-card">
      <h2 className="section-title">Stats</h2>
      <div className="space-y-2">
        {categories.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-semibold text-[rgb(255,138,128)] mb-2 flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[rgb(255,138,128)] rounded-full"></div>
              {section.category}
            </h3>
            <div className="grid gap-0.5">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-1.5 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group"
                >
                  <div
                    className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
                    style={getIconStyles(item.id, item.title)}
                  >
                    <item.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
                  </div>
                  <span className="section-text text-xs font-medium flex-1">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
