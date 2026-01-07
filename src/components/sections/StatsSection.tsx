import React from 'react';
import { StatCategory } from '../../data/profileData';

interface StatsSectionProps {
  categories: StatCategory[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ categories }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Stats</h2>
      <div className="space-y-4">
        {categories.map((section) => (
          <div key={section.category}>
            <h3 className="text-sm font-semibold icon-accent mb-2">{section.category}</h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.id} className="flex-center gap-small">
                  <item.icon className="icon-small icon-accent" />
                  <span className="section-text">{item.title}</span>
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
