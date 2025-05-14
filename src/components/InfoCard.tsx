import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = '' }) => (
  <div className={`section-card ${className}`}>
    <h2 className="section-title">{title}</h2>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

export default InfoCard; 