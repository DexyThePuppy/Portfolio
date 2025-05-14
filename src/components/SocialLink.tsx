import React from 'react';
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SocialLinkProps {
  url: string;
  icon: IconProp | React.ElementType;
  displayName: string;
  value: string;
  isVerified: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  url,
  icon,
  displayName,
  value,
  isVerified
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
  >
    <div className="social-icon-container section-card">
      {typeof icon === 'function' ? (
        React.createElement(icon, { className: "icon-small" })
      ) : (
        <FontAwesomeIcon icon={icon as IconProp} className="icon-small" />
      )}
    </div>
    <div className="flex-1">
      <div className="flex-center gap-small">
        <span className="section-text">{displayName}</span>
        {isVerified && (
          <CheckBadgeIcon className="icon-small icon-accent" />
        )}
      </div>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
    <ArrowTopRightOnSquareIcon className="icon-small icon-accent" />
  </a>
);

export default SocialLink; 