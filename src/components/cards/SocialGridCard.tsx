import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobeAltIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useHapticsWithAudio } from '../../hooks/useHapticsWithAudio';
import { getSocialIcon, getSocialColors, getSocialDisplayName, getSocialCustomIcon } from '../../utils/socialNetworks';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../../utils/visualUtils';
import { seededRandom } from '../../utils/galleryUtils';
import { GridCard, useGridCardHover } from './GridCard';

export interface SocialAccount {
  id: string;
  socialNetwork: string;
  isVerified: boolean;
  url: string;
  displayName: string;
  value: string;
  accessPermission: string;
}

interface SocialGridCardProps {
  account: SocialAccount;
  isHovered: boolean;
  setHoveredId: (id: string | null) => void;
}

const SocialGridCard: React.FC<SocialGridCardProps> = React.memo(({ account, isHovered, setHoveredId }) => {
  const { trigger } = useHapticsWithAudio();
  const {
    cardRef,
    rotation,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useGridCardHover(`social-${account.id}`, setHoveredId);

  const icon = getSocialIcon(account.socialNetwork);
  const customIcon = getSocialCustomIcon(account.socialNetwork);
  const colors = getSocialColors(account.socialNetwork);

  // Consistent "random" values based on account ID
  const initialIconRotation = (seededRandom(`${account.id}-rotation`) - 0.5) * 16;
  // Subtle padding variation (16-48px) - enough for effect without wasting space
  const randomPadding = 16 + seededRandom(`${account.id}-padding`) * 32;

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="flex-grow min-w-0 max-w-full"
    >
      <GridCard isHovered={isHovered} rotation={rotation}>
        <a
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trigger('light')}
          className={`
            card-pressable flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${colors.gradient}
            border border-[var(--color-primary-muted)]
            ${isHovered ? 'border-[var(--color-primary-40)]' : ''}
          `}
          style={getIconStyles(account.id, account.socialNetwork)}
        >
          {/* Blurred icon background */}
          <div 
            className="absolute inset-0 opacity-30 flex items-center justify-center"
            style={{
              filter: 'blur(12px) saturate(1.5)',
              ...getBackgroundStyles(account.id, account.socialNetwork),
            }}
          >
            {icon && (
              <FontAwesomeIcon 
                icon={icon} 
                className="w-32 h-32"
                style={{ color: colors.glow }}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="grain-texture absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: GRAIN_TEXTURE_URL }}
          />
          
          {/* Content - Horizontal layout */}
          <div 
            className="relative flex items-center gap-3 py-3 pl-4 min-w-0"
            style={{ paddingRight: randomPadding }}
          >
            {customIcon ? (
              <img 
                src={customIcon}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg flex-shrink-0 object-contain"
                style={{
                  transform: isHovered 
                    ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                    : `scale(1) rotate(${initialIconRotation}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                }}
              />
            ) : icon ? (
              <FontAwesomeIcon 
                icon={icon} 
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg flex-shrink-0" 
                style={{ 
                  color: colors.glow,
                  transform: isHovered 
                    ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                    : `scale(1) rotate(${initialIconRotation}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                }} 
              />
            ) : (
              <GlobeAltIcon 
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg text-on-background flex-shrink-0" 
                style={{
                  transform: isHovered 
                    ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                    : `scale(1) rotate(${initialIconRotation}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                }}
              />
            )}
            <div className="min-w-0">
              <h4 className="flex items-center gap-1 text-sm font-bold text-on-background leading-tight">
                <span className="truncate">{getSocialDisplayName(account.socialNetwork)}</span>
                {account.isVerified && (
                  <CheckBadgeIcon
                    className="w-3.5 h-3.5 text-primary flex-shrink-0"
                    aria-label="Verified account"
                  />
                )}
              </h4>
              <p className="text-xs text-on-surface-variant leading-tight truncate">{account.value}</p>
            </div>
          </div>
        </a>
      </GridCard>
    </div>
  );
});

SocialGridCard.displayName = 'SocialGridCard';

export default SocialGridCard;
