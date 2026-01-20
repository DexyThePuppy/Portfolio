import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// Components
import Banner from './Banner';
import ImageModal from './ImageModal';
import KinksTable from './KinksTable';
import {
  StatsSection,
  HobbiesSection,
} from './sections';
import type { Language, TechItem, PlatformItem } from '../data/profileData';

// Context
import { useNSFW } from '../contexts/NSFWContext';

// Icons
import { 
  MapPinIcon, 
  CakeIcon,
  SparklesIcon,
  UserGroupIcon,
  PhotoIcon,
  CpuChipIcon,
  GlobeAltIcon,
  Square3Stack3DIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSocialIcon, getSocialColors, getSocialDisplayName, getSocialCustomIcon } from '../utils/socialNetworks';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../utils/visualUtils';

// Data
import {
  statsInfo,
  hobbies,
  languages,
  techSetup,
  platforms,
} from '../data/profileData';

// Types
import type { ProfileImage, Profile as ProfileType } from '../types/index';

// Utils
import { getModifiedImageUrl, getGalleryImageSize } from '../utils/imageUtils';
import { ANIMATION_TIMINGS, Z_INDEX, GALLERY } from '../constants';

interface ProfileProps {
  profile: ProfileType;
}

// Generate a consistent "random" number from a string (0-1 range)
const seededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs((Math.sin(hash) * 10000) % 1);
};

// Gallery Item Component with z-index management
interface GalleryItemProps {
  photo: ProfileImage;
  index: number;
  isLoaded: boolean;
  optimalSize: number;
  displayName: string;
  getModifiedImageUrl: (uuid: string, width?: number) => string;
  onImageClick: (photo: ProfileImage, index: number, e: React.MouseEvent, rotation: number) => void;
  isLifted: boolean;
  isDropping: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = React.memo(({
  photo,
  index,
  isLoaded,
  optimalSize,
  displayName,
  getModifiedImageUrl,
  onImageClick,
  isLifted,
  isDropping,
  hoveredId,
  setHoveredId,
}) => {
  const isHovered = hoveredId === photo.id;

  // Generate a new random rotation on every hover
  const [rotation, setRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);

  const handleMouseEnter = useCallback(() => {
    setHoveredId(photo.id);
    // Generate random rotation: 2-4° or -2 to -4°
    const randomRange = Math.random() * 2;
    const baseRotation = 2 + randomRange;
    const direction = Math.random() < 0.5 ? 1 : -1;
    const newRotation = baseRotation * direction;
    setRotation(newRotation);
    
    // Delayed inner rotation (smoother, smaller)
    setTimeout(() => {
      const innerRandomRange = Math.random() * 1.5;
      const innerBaseRotation = 1.5 + innerRandomRange;
      const innerDirection = Math.random() < 0.5 ? 1 : -1;
      setInnerRotation(innerBaseRotation * innerDirection);
    }, ANIMATION_TIMINGS.INNER_ROTATION_DELAY);
  }, [photo.id, setHoveredId]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setInnerRotation(0);
    // Delay rotation reset to match scale transition
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    onImageClick(photo, index, e, rotation);
  }, [photo, index, onImageClick, rotation]);

  return (
    <div
      className="gallery-item-wrapper"
      style={{
        zIndex: isHovered ? Z_INDEX.GALLERY_HOVERED : Z_INDEX.BASE,
        opacity: isLifted ? 0 : 1,
        pointerEvents: isLifted ? 'none' : undefined,
        transition: 'opacity 150ms ease-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`gallery-item rounded-xl cursor-pointer relative ${
          isLoaded ? 'thumbnail-loaded' : ''
        }`}
        onClick={handleClick}
        style={{ 
          overflow: 'visible',
          transform: isHovered 
            ? `scale(${GALLERY.HOVER_SCALE}) rotate(${rotation}deg)` 
            : isDropping 
              ? `scale(${GALLERY.DROP_SCALE}) rotate(0deg)` 
              : 'scale(1) rotate(0deg)',
          transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        data-photo-id={photo.id}
      >
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            boxShadow: isHovered 
              ? '0 0 0 6px #1A1A1A' 
              : '0 0 0 1px rgba(255, 138, 128, 0.1)',
            transition: 'box-shadow 300ms ease-out',
          }}
        >
          <img
            src={getModifiedImageUrl(photo.image.uuid, optimalSize)}
            alt={`${displayName}'s photo ${index + 1}`}
            className="w-full h-auto object-cover"
            loading="lazy"
            style={{ 
              display: 'block',
              transform: isHovered ? `scale(${GALLERY.INNER_HOVER_SCALE}) rotate(${innerRotation}deg)` : 'scale(1) rotate(0deg)',
              transition: 'transform 600ms cubic-bezier(0.25, 1.2, 0.5, 1)',
            }}
          />
        </div>
      </div>
    </div>
  );
});

GalleryItem.displayName = 'GalleryItem';

// ============================================================================
// PROFILE HEADER COMPONENT - Bento Grid Style
// ============================================================================

interface ProfileHeaderProps {
  displayName: string;
  profileImageUrl: string;
  location: {
    region: string;
    country: string;
  };
  age: number;
  species: string;
  relationshipStatus: string;
  personality: string;
  languages: Language[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = React.memo(({
  displayName,
  profileImageUrl,
  location,
  age,
  species,
  relationshipStatus,
  personality,
  languages: langs,
}) => {
  return (
    <div className="mb-6">
      {/* Compact Header Layout */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Profile Image */}
        <div className="relative group flex-shrink-0 mx-auto sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(255,138,128)] to-pink-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <img
            src={profileImageUrl}
            alt={displayName}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[rgb(255,138,128)]/40 group-hover:border-[rgb(255,138,128)]/70 transition-all duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
          {/* Name & Location */}
          <div className="mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{displayName}</h1>
            <p className="text-white/60 text-sm flex items-center gap-1.5 justify-center sm:justify-start">
              <MapPinIcon className="w-4 h-4" />
              {location.region}, {location.country}
            </p>
          </div>

          {/* Unified Badge Section */}
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {/* Info Badges */}
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all">
              <SparklesIcon className="w-3 h-3 text-[rgb(255,138,128)]" />
              {species}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all">
              <CakeIcon className="w-3 h-3 text-blue-400" />
              {age} years
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all">
              <HeartIconSolid className="w-3 h-3 text-pink-400" />
              {relationshipStatus}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all">
              <UserGroupIcon className="w-3 h-3 text-purple-400" />
              {personality}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all">
              🏳️‍🌈 Gay
            </span>
            
            {/* Language Badges */}
            {langs.map((lang) => (
              <span
                key={lang.id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/90 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {lang.flag} {lang.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

// ============================================================================
// TAB TYPES & COMPONENTS
// ============================================================================

type TabType = 'gallery' | 'kinks' | 'tech' | 'socials' | 'platforms';

interface TabButtonProps {
  id: TabType;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: (tab: TabType) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`
      flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
      ${isActive 
        ? 'bg-[rgb(255,138,128)]/20 text-[rgb(255,138,128)] border border-[rgb(255,138,128)]/30' 
        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
      }
    `}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

// ============================================================================
// GRID CARD COMPONENTS (with rotation/scale effects)
// ============================================================================

interface GridCardProps {
  children: React.ReactNode;
  isHovered: boolean;
  rotation: number;
}

const GridCard: React.FC<GridCardProps> = ({ children, isHovered, rotation }) => (
  <div
    className="relative cursor-pointer"
    style={{
      zIndex: isHovered ? Z_INDEX.GALLERY_HOVERED : Z_INDEX.BASE,
      transform: isHovered ? `scale(${GALLERY.HOVER_SCALE}) rotate(${rotation}deg)` : 'scale(1) rotate(0deg)',
      transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}
  >
    {children}
  </div>
);

// Tech Card for Grid
interface TechGridCardProps {
  item: TechItem;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const TechGridCard: React.FC<TechGridCardProps> = React.memo(({ item, hoveredId, setHoveredId }) => {
  const [rotation, setRotation] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === `tech-${item.id}`;
  
  // Consistent "random" values based on item ID
  const initialIconRotation = (seededRandom(`${item.id}-rotation`) - 0.5) * 16;
  // Subtle padding variation (16-48px) - enough for effect without wasting space
  const randomPadding = 16 + seededRandom(`${item.id}-padding`) * 32;

  // Measure card width and update on resize
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate rotation based on card width (longer cards = less rotation)
  // Assume cards range from ~120px to ~400px, scale rotation from 4° to 1°
  const getRotationForWidth = (width: number): number => {
    if (width === 0) return 2; // Default while measuring
    const minWidth = 120;
    const maxWidth = 400;
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    const normalized = (clampedWidth - minWidth) / (maxWidth - minWidth);
    const maxRotation = 4;
    const minRotation = 1;
    return minRotation + (1 - normalized) * (maxRotation - minRotation);
  };

  const handleMouseEnter = useCallback(() => {
    setHoveredId(`tech-${item.id}`);
    const baseRotation = getRotationForWidth(cardWidth);
    const randomRange = Math.random() * 1;
    const direction = Math.random() < 0.5 ? 1 : -1;
    setRotation((baseRotation + randomRange) * direction);
  }, [item.id, setHoveredId, cardWidth]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className="flex-grow min-w-fit"
    >
      <GridCard isHovered={isHovered} rotation={rotation}>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${item.color || 'from-gray-500/20 to-gray-600/20'}
            border border-[rgb(255,138,128)]/10
            ${isHovered ? 'border-[rgb(255,138,128)]/40' : ''}
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
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: GRAIN_TEXTURE_URL }}
          />
          
          {/* Content - Horizontal layout */}
          <div 
            className="relative flex items-center gap-3 py-3 pl-4"
            style={{ paddingRight: randomPadding }}
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg flex-shrink-0"
              style={{
                transform: isHovered 
                  ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                  : `scale(1) rotate(${initialIconRotation}deg)`,
                transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
              }}
            />
            <div className="flex-shrink-0">
              <span className="text-[8px] uppercase tracking-wider text-[rgb(255,138,128)] font-medium block">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight whitespace-nowrap">{item.name}</h4>
              <p className="text-xs text-gray-400 leading-tight whitespace-nowrap">{item.spec}</p>
            </div>
          </div>
        </a>
      </GridCard>
    </div>
  );
});

TechGridCard.displayName = 'TechGridCard';

// Platform Card for Grid
interface PlatformGridCardProps {
  platform: PlatformItem;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const PlatformGridCard: React.FC<PlatformGridCardProps> = React.memo(({ platform, hoveredId, setHoveredId }) => {
  const [rotation, setRotation] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === `platform-${platform.id}`;
  
  // Consistent "random" values based on platform ID
  const initialIconRotation = (seededRandom(`${platform.id}-rotation`) - 0.5) * 16;
  // Subtle padding variation (16-48px) - enough for effect without wasting space
  const randomPadding = 16 + seededRandom(`${platform.id}-padding`) * 32;

  // Measure card width and update on resize
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate rotation based on card width (longer cards = less rotation)
  // Assume cards range from ~120px to ~400px, scale rotation from 4° to 1°
  const getRotationForWidth = (width: number): number => {
    if (width === 0) return 2; // Default while measuring
    const minWidth = 120;
    const maxWidth = 400;
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    const normalized = (clampedWidth - minWidth) / (maxWidth - minWidth);
    const maxRotation = 4;
    const minRotation = 1;
    return minRotation + (1 - normalized) * (maxRotation - minRotation);
  };

  const handleMouseEnter = useCallback(() => {
    setHoveredId(`platform-${platform.id}`);
    const baseRotation = getRotationForWidth(cardWidth);
    const randomRange = Math.random() * 1;
    const direction = Math.random() < 0.5 ? 1 : -1;
    setRotation((baseRotation + randomRange) * direction);
  }, [platform.id, setHoveredId, cardWidth]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className="flex-grow min-w-fit"
    >
      <GridCard isHovered={isHovered} rotation={rotation}>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${platform.color || 'from-gray-500/20 to-gray-600/20'}
            border border-[rgb(255,138,128)]/10
            ${isHovered ? 'border-[rgb(255,138,128)]/40' : ''}
          `}
          style={getIconStyles(platform.id, platform.name)}
        >
          {/* Blurred background */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url(${platform.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px) saturate(1.2)',
              ...getBackgroundStyles(platform.id, platform.name),
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: GRAIN_TEXTURE_URL }}
          />
          
          {/* Content - Horizontal layout */}
          <div 
            className="relative flex items-center gap-3 py-3 pl-4"
            style={{ paddingRight: randomPadding }}
          >
            <img 
              src={platform.image} 
              alt={platform.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg flex-shrink-0"
              style={{
                transform: isHovered 
                  ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                  : `scale(1) rotate(${initialIconRotation}deg)`,
                transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
              }}
            />
            <div className="flex-shrink-0">
              <h4 className="text-sm font-bold text-white leading-tight whitespace-nowrap">{platform.name}</h4>
              <p className="text-xs text-gray-400 leading-tight whitespace-nowrap">{platform.description}</p>
            </div>
          </div>
        </a>
      </GridCard>
    </div>
  );
});

PlatformGridCard.displayName = 'PlatformGridCard';

// Social Card for Grid
interface SocialAccount {
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
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const SocialGridCard: React.FC<SocialGridCardProps> = React.memo(({ account, hoveredId, setHoveredId }) => {
  const [rotation, setRotation] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === `social-${account.id}`;
  const icon = getSocialIcon(account.socialNetwork);
  const customIcon = getSocialCustomIcon(account.socialNetwork);
  const colors = getSocialColors(account.socialNetwork);
  
  // Consistent "random" values based on account ID
  const initialIconRotation = (seededRandom(`${account.id}-rotation`) - 0.5) * 16;
  // Subtle padding variation (16-48px) - enough for effect without wasting space
  const randomPadding = 16 + seededRandom(`${account.id}-padding`) * 32;

  // Measure card width and update on resize
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate rotation based on card width (longer cards = less rotation)
  // Assume cards range from ~120px to ~400px, scale rotation from 4° to 1°
  const getRotationForWidth = (width: number): number => {
    if (width === 0) return 2; // Default while measuring
    const minWidth = 120;
    const maxWidth = 400;
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    const normalized = (clampedWidth - minWidth) / (maxWidth - minWidth);
    const maxRotation = 4;
    const minRotation = 1;
    return minRotation + (1 - normalized) * (maxRotation - minRotation);
  };

  const handleMouseEnter = useCallback(() => {
    setHoveredId(`social-${account.id}`);
    const baseRotation = getRotationForWidth(cardWidth);
    const randomRange = Math.random() * 1;
    const direction = Math.random() < 0.5 ? 1 : -1;
    setRotation((baseRotation + randomRange) * direction);
  }, [account.id, setHoveredId, cardWidth]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className="flex-grow min-w-fit"
    >
      <GridCard isHovered={isHovered} rotation={rotation}>
        <a
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${colors.gradient}
            border border-[rgb(255,138,128)]/10
            ${isHovered ? 'border-[rgb(255,138,128)]/40' : ''}
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
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: GRAIN_TEXTURE_URL }}
          />
          
          {/* Content - Horizontal layout */}
          <div 
            className="relative flex items-center gap-3 py-3 pl-4"
            style={{ paddingRight: randomPadding }}
          >
            {customIcon ? (
              <img 
                src={customIcon}
                alt={getSocialDisplayName(account.socialNetwork)}
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
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg text-white flex-shrink-0" 
                style={{
                  transform: isHovered 
                    ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                    : `scale(1) rotate(${initialIconRotation}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                }}
              />
            )}
            <div className="flex-shrink-0">
              <h4 className="text-sm font-bold text-white leading-tight whitespace-nowrap">{getSocialDisplayName(account.socialNetwork)}</h4>
              <p className="text-xs text-gray-400 leading-tight whitespace-nowrap">{account.value}</p>
            </div>
          </div>
        </a>
      </GridCard>
    </div>
  );
});

SocialGridCard.displayName = 'SocialGridCard';

// ============================================================================
// MAIN PROFILE COMPONENT
// ============================================================================

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const { nsfwEnabled } = useNSFW();
  
  const publicSocialAccounts = profile.socialAccounts.filter(
    (account: any) => account.accessPermission === 'public'
  );

  // Filter images based on NSFW preference
  const galleryImages = useMemo(() => {
    const publicImgs = profile.images.filter(
      (img: any) => img.accessPermission === 'public' && !img.isAd
    );

    if (nsfwEnabled) {
      // Show all images (safe + nsfw)
      return publicImgs;
    } else {
      // Only show SFW images
      return publicImgs.filter(
        (img: any) => img.image.contentRating === 'safe'
      );
    }
  }, [profile.images, nsfwEnabled]);

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('gallery');

  // Switch away from kinks tab if NSFW is disabled
  useEffect(() => {
    if (!nsfwEnabled && activeTab === 'kinks') {
      setActiveTab('gallery');
    }
  }, [nsfwEnabled, activeTab]);

  // WebKit detection for Safari-specific styling
  const [isWebKit, setIsWebKit] = useState(false);
  useEffect(() => {
    const isWebKitBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    setIsWebKit(isWebKitBrowser);
  }, []);

  // Hover state - tracks which item is currently hovered (works for all tabs)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Consolidated timeout refs for easier management
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle hover state changes with delayed unhover
  const handleSetHoveredId = useCallback((id: string | null) => {
    // Clear existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (id !== null) {
      // Set hover immediately
      setHoveredId(id);
    } else {
      // Delay unhover to allow transition to complete
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredId(null);
        hoverTimeoutRef.current = null;
      }, ANIMATION_TIMINGS.HOVER_DELAY);
    }
  }, []);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Modal state
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialRotation, setInitialRotation] = useState(0);
  const [liftedImageId, setLiftedImageId] = useState<string | null>(null);
  const [modalOpenNonce, setModalOpenNonce] = useState(0);
  const [droppingImageId, setDroppingImageId] = useState<string | null>(null);

  // Preload gallery images
  useEffect(() => {
    galleryImages.forEach((photo: any) => {
      const img = new Image();
      img.src = getModifiedImageUrl(photo.image.uuid, getGalleryImageSize());
    });
  }, [galleryImages]);

  // Track thumbnail URL for instant preview
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  // Handle image click from gallery
  const handleImageClick = (
    image: ProfileImage,
    _index: number,
    element: HTMLDivElement | null,
    rotation: number = 0
  ) => {
    if (!element) return;

    // Clear hover state immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredId(null);

    // Get the clicked image's actual src (already loaded in browser)
    const imgElement = element.querySelector('img');
    const currentSrc = imgElement?.currentSrc || imgElement?.src || '';
    setThumbnailUrl(currentSrc);

    // Store the rotation for modal
    setInitialRotation(rotation);

    // Get the clicked image position immediately
    const rect = element.getBoundingClientRect();
    setStartPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedImage(image);
    setIsModalOpen(true);
    // Force the modal to re-run its loading pipeline even if the same image is clicked repeatedly
    setModalOpenNonce((n) => n + 1);
  };

  // Handle gallery image click
  const handleGalleryImageClick = (photo: ProfileImage, index: number, e: React.MouseEvent, rotation: number) => {
    e.stopPropagation();
    // Visually "lift" the clicked tile out of the gallery while the modal animates
    setLiftedImageId(photo.id);
    const element = e.currentTarget as HTMLDivElement;
    handleImageClick(photo, index, element, rotation);
  };

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    // Trigger drop-down effect on gallery item
    if (selectedImage) {
      setDroppingImageId(selectedImage.id);
      setTimeout(() => setDroppingImageId(null), ANIMATION_TIMINGS.MODAL_CLOSE);
    }
    
    setSelectedImage(null);
    setStartPosition(null);
    setIsModalOpen(false);
    setLiftedImageId(null);
    setInitialRotation(0);
    setThumbnailUrl('');
  }, [selectedImage]);


  return (
    <div className="min-h-screen bg-secondary text-white">
      <Banner imageUrl="/img/banner.JPEG" isModalOpen={isModalOpen} />

      {/* Scrollable Content Area */}
      <div className="relative z-10">
        {/* Empty space to push content below the banner */}
        <div className="h-[25vh]" />

        {/* Main Content with dark background */}
        <div className="bg-secondary min-h-[35vh] rounded-t-3xl shadow-lg pt-8 border-t border-[rgb(255,138,128)]/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ProfileHeader
              displayName={profile.displayName}
              profileImageUrl={getModifiedImageUrl(profile.profileImage.image.uuid)}
              location={{
                region: profile.location.place.region,
                country: profile.location.place.country,
              }}
              age={profile.age}
              species="Shep × Bernese × Dragon"
              relationshipStatus="Single and looking"
              personality="Ambivert"
              languages={languages}
            />

            {/* Main Content */}
            <div className="mt-6">
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Left Column - Info Sections */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <StatsSection categories={statsInfo} />
                  <HobbiesSection items={hobbies} />
                </div>

                {/* Right Column - Tabbed Content */}
                <div className="lg:col-span-9 order-1 lg:order-2 overflow-visible">
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-4">
                    <TabButton id="gallery" label="Gallery" icon={PhotoIcon} isActive={activeTab === 'gallery'} onClick={setActiveTab} />
                    {nsfwEnabled && (
                      <TabButton id="kinks" label="Kinks" icon={FireIcon} isActive={activeTab === 'kinks'} onClick={setActiveTab} />
                    )}
                    <TabButton id="tech" label="Hardware" icon={CpuChipIcon} isActive={activeTab === 'tech'} onClick={setActiveTab} />
                    <TabButton id="socials" label="Socials" icon={GlobeAltIcon} isActive={activeTab === 'socials'} onClick={setActiveTab} />
                    <TabButton id="platforms" label="Platforms" icon={Square3Stack3DIcon} isActive={activeTab === 'platforms'} onClick={setActiveTab} />
                  </div>

                  {/* Tab Content */}
                  <div>
                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                      <div className={`gallery-masonry${isWebKit ? ' is-webkit' : ''}`}>
                        {galleryImages.map((photo: any, index: number) => {
                          const optimalSize = getGalleryImageSize();
                          return (
                            <GalleryItem
                              key={photo.id}
                              photo={photo}
                              index={index}
                              isLoaded={true}
                              optimalSize={optimalSize}
                              displayName={profile.displayName}
                              getModifiedImageUrl={getModifiedImageUrl}
                              onImageClick={handleGalleryImageClick}
                              isLifted={liftedImageId === photo.id && selectedImage?.id === photo.id}
                              isDropping={droppingImageId === photo.id}
                              hoveredId={hoveredId}
                              setHoveredId={handleSetHoveredId}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Kinks Tab (NSFW only) */}
                    {activeTab === 'kinks' && nsfwEnabled && (
                      <KinksTable />
                    )}

                    {/* Hardware Tab */}
                    {activeTab === 'tech' && (
                      <div className="flex flex-wrap gap-3">
                        {techSetup.map((item) => (
                          <TechGridCard
                            key={item.id}
                            item={item}
                            hoveredId={hoveredId}
                            setHoveredId={handleSetHoveredId}
                          />
                        ))}
                      </div>
                    )}

                    {/* Socials Tab */}
                    {activeTab === 'socials' && (
                      <div className="flex flex-wrap gap-3">
                        {publicSocialAccounts.map((account: any) => (
                          <SocialGridCard
                            key={account.id}
                            account={account}
                            hoveredId={hoveredId}
                            setHoveredId={handleSetHoveredId}
                          />
                        ))}
                      </div>
                    )}

                    {/* Platforms Tab */}
                    {activeTab === 'platforms' && (
                      <div className="flex flex-wrap gap-3">
                        {platforms.map((platform) => (
                          <PlatformGridCard
                            key={platform.id}
                            platform={platform}
                            hoveredId={hoveredId}
                            setHoveredId={handleSetHoveredId}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        startPosition={startPosition}
        thumbnailUrl={thumbnailUrl}
        initialRotation={initialRotation}
        openNonce={modalOpenNonce}
        getImageUrl={getModifiedImageUrl}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Profile;
