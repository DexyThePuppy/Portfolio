import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../utils/visualUtils';
import type { TechItem, PlatformItem } from '../types';

// ============================================================================
// ENHANCED CARD COMPONENT
// ============================================================================

interface EnhancedCardProps {
  id: string;
  name: string;
  url: string;
  image: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared enhanced card component with background image, overlays, and animations
 * Used by all card sections
 */
export const EnhancedCard: React.FC<EnhancedCardProps> = React.memo(({
  id,
  name,
  url,
  image,
  color,
  className = '',
  children,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center rounded-xl
        bg-gradient-to-br ${color || 'from-gray-500/20 to-gray-600/20'}
        border border-[rgb(255,138,128)]/10
        hover:border-[rgb(255,138,128)]/30 hover:scale-105
        transition-all duration-300 ease-out
        cursor-pointer overflow-hidden
        ${className}
      `}
      style={getIconStyles(id, name)}
    >
      {/* Blurred background image */}
      <div 
        className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) saturate(1.2)',
          ...getBackgroundStyles(id, name),
        }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: GRAIN_TEXTURE_URL }}
      />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content (passed as children) */}
      {children}
    </a>
  );
});

EnhancedCard.displayName = 'EnhancedCard';

// ============================================================================
// CARD SECTION WRAPPER
// ============================================================================

interface CardSectionProps<T> {
  title: string;
  items: T[];
  gridClassName?: string;
  renderCard: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * Universal card section component
 * Handles the common section wrapper and grid layout
 * Content is customized via the renderCard function
 */
export function CardSection<T>({ 
  title, 
  items, 
  gridClassName = 'grid grid-cols-1 gap-1.5',
  renderCard,
  className = ''
}: CardSectionProps<T>) {
  return (
    <div className={`section-card ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div className={gridClassName}>
        {items.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
}

// ============================================================================
// CARD RENDERERS
// ============================================================================

/**
 * Render function for tech setup cards
 */
export const renderTechCard = (item: TechItem) => (
  <EnhancedCard
    key={item.id}
    id={item.id}
    name={item.name}
    url={item.url}
    image={item.image}
    color={item.color}
    className="gap-2 p-2"
  >
    {/* Product Image */}
    <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center tech-icon-rotate">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
    
    {/* Content */}
    <div className="relative flex-1 min-w-0">
      <h4 className="text-xs font-bold text-white leading-tight truncate">
        {item.name}
      </h4>
      <p className="text-[10px] text-gray-400 leading-tight truncate">
        {item.spec}
      </p>
    </div>

    {/* Category tag */}
    <span className="relative text-[8px] uppercase tracking-wider text-gray-500 font-medium px-1.5 py-0.5 bg-black/30 rounded flex-shrink-0 hidden md:inline">
      {item.category}
    </span>

    {/* External link indicator */}
    <div className="relative flex-shrink-0 w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out">
      <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
    </div>
  </EnhancedCard>
);

/**
 * Render function for platform cards
 */
export const renderPlatformCard = (platform: PlatformItem) => (
  <EnhancedCard
    key={platform.id}
    id={platform.id}
    name={platform.name}
    url={platform.url}
    image={platform.image}
    color={platform.color}
    className="gap-3 p-2.5"
  >
    {/* Platform Logo */}
    <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center tech-icon-rotate">
      <img 
        src={platform.image} 
        alt={platform.name}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
    
    {/* Content */}
    <div className="relative flex-1 min-w-0">
      <h4 className="text-sm font-bold text-white leading-tight">
        {platform.name}
      </h4>
      <p className="text-xs text-gray-400 leading-tight">
        {platform.description}
      </p>
    </div>

    {/* External link indicator */}
    <ArrowTopRightOnSquareIcon className="relative w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
  </EnhancedCard>
);
