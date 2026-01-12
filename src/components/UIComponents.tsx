import React from 'react';
import { getIconStyles } from '../utils/visualUtils';

// ============================================================================
// INFO BADGE
// ============================================================================

interface InfoBadgeProps {
  icon: React.ElementType;
  text: string;
  id: string;
  className?: string;
}

/**
 * Reusable info badge component with animated icon
 * Used in ProfileHeader and other sections
 */
export const InfoBadge: React.FC<InfoBadgeProps> = React.memo(({ icon: Icon, text, id, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 info-card group ${className}`}>
      <div
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center tech-icon-rotate"
        style={getIconStyles(id, text)}
      >
        <Icon className="w-5 h-5 text-[rgb(255,138,128)]" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
});

InfoBadge.displayName = 'InfoBadge';
