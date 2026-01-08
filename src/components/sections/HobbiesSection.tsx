import React from 'react';
import { InfoItem } from '../../data/profileData';

interface HobbiesSectionProps {
  items: InfoItem[];
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({ items }) => {
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
      <h2 className="section-title">Hobbies & Skills</h2>
      <div className="flex flex-wrap gap-1.5">
        {items.map((hobby) => (
          <div
            key={hobby.id}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 hover:scale-105 group"
          >
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles(hobby.id, hobby.title)}
            >
              <hobby.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <span className="section-text text-xs font-medium">{hobby.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesSection;
