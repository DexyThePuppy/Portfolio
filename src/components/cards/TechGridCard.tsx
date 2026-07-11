import React from 'react';
import { useHapticsWithAudio } from '../../hooks/useHapticsWithAudio';
import type { TechItem } from '../../data/profileData';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../../utils/visualUtils';
import { seededRandom } from '../../utils/galleryUtils';
import { GridCard, useGridCardHover } from './GridCard';

interface TechGridCardProps {
  item: TechItem;
  isHovered: boolean;
  setHoveredId: (id: string | null) => void;
}

const TechGridCard: React.FC<TechGridCardProps> = React.memo(({ item, isHovered, setHoveredId }) => {
  const { trigger } = useHapticsWithAudio();
  const {
    cardRef,
    rotation,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useGridCardHover(`tech-${item.id}`, setHoveredId);

  // Consistent "random" values based on item ID
  const initialIconRotation = (seededRandom(`${item.id}-rotation`) - 0.5) * 16;
  // Subtle padding variation (16-48px) - enough for effect without wasting space
  const randomPadding = 16 + seededRandom(`${item.id}-padding`) * 32;

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
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trigger('light')}
          className={`
            card-pressable flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${item.color || 'from-gray-500/20 to-gray-600/20'}
            border border-[var(--color-primary-muted)]
            ${isHovered ? 'border-[var(--color-primary-40)]' : ''}
          `}
          style={getIconStyles(item.id, item.name)}
        >
          {/* Blurred background */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px) saturate(1.2)',
              ...getBackgroundStyles(item.id, item.name),
            }}
          />
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
            <img 
              src={item.image} 
              alt=""
              loading="lazy"
              decoding="async"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg flex-shrink-0"
              style={{
                transform: isHovered 
                  ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                  : `scale(1) rotate(${initialIconRotation}deg)`,
                transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
              }}
            />
            <div className="min-w-0">
              <span className="text-[8px] uppercase tracking-wider text-primary font-medium block">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-on-background leading-tight truncate">{item.name}</h4>
              <p className="text-xs text-on-surface-variant leading-tight truncate">{item.spec}</p>
            </div>
          </div>
        </a>
      </GridCard>
    </div>
  );
});

TechGridCard.displayName = 'TechGridCard';

export default TechGridCard;
