import React from 'react';
import { InfoItem, Language } from '../../data/profileData';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface AboutSectionProps {
  items: InfoItem[];
  languages?: Language[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items, languages }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">About</h2>
      <div className="space-y-3">
        {items.map((info) => (
          <div key={info.id} className="flex-center gap-small">
            <info.icon className="icon-small icon-accent" />
            <span className="section-text">{info.title}</span>
          </div>
        ))}
        
        {/* Languages in a single line */}
        {languages && languages.length > 0 && (
          <div className="flex-center gap-small">
            <LanguageIcon className="icon-small icon-accent" />
            <span className="section-text">
              {languages.map((lang, index) => (
                <span key={lang.id}>
                  {lang.flag} {lang.name}
                  {index < languages.length - 1 && ' • '}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
