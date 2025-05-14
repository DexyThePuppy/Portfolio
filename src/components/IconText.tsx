import React from 'react';

interface IconTextProps {
  icon: React.ElementType | React.FC;
  text: string;
  className?: string;
}

const IconText: React.FC<IconTextProps> = ({ icon: Icon, text, className = '' }) => (
  <div className={`flex-center gap-small ${className}`}>
    {React.createElement(Icon, { className: "icon-small icon-accent" })}
    <span className="section-text">{text}</span>
  </div>
);

export default IconText; 