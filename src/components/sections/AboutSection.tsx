import React from 'react';
import { InfoItem, Language } from '../../data/profileData';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface AboutSectionProps {
  items: InfoItem[];
  languages?: Language[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items, languages }) => {
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
      <h2 className="section-title">About</h2>
      <div className="grid grid-cols-1 gap-0.5">
        {items.map((info) => (
          <div
            key={info.id}
            className="flex items-center gap-2.5 p-2 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group"
          >
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles(info.id, info.title)}
            >
              <info.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <span className="section-text text-xs font-medium">{info.title}</span>
          </div>
        ))}

        {/* Languages as compact inline badges */}
        {languages && languages.length > 0 && (
          <div className="flex items-center gap-2.5 p-2 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group">
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('languages', 'Languages')}
            >
              <LanguageIcon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang, index) => (
                <span
                  key={lang.id}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[rgb(255,138,128)]/10 text-[rgb(255,138,128)] text-xs font-medium rounded"
                >
                  {lang.flag} {lang.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
