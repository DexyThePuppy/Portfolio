import React from 'react';
import { Language } from '../../data/profileData';

interface LanguagesSectionProps {
  items: Language[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ items }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Languages</h2>
      <div className="space-y-2">
        {items.map((language) => (
          <div key={language.id} className="flex-center gap-small">
            <span className="text-xl">{language.flag}</span>
            <span className="section-text">{language.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesSection;
