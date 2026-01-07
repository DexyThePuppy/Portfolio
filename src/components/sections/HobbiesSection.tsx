import React from 'react';
import { InfoItem } from '../../data/profileData';

interface HobbiesSectionProps {
  items: InfoItem[];
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({ items }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Hobbies & Skills</h2>
      <div className="space-y-2">
        {items.map((hobby) => (
          <div key={hobby.id} className="flex-center gap-small">
            <hobby.icon className="icon-small icon-accent" />
            <span className="section-text">{hobby.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesSection;
