import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { playWhooshSound } from '../utils/audioHaptics';

// Components
import Banner from './Banner';
import ImageModal from './ImageModal';
import KinksTable from './KinksTable';
import {
  StatsSection,
  HobbiesSection,
} from './sections';
import SettingsContent from './SettingsContent';
import type { Language, TechItem, PlatformItem } from '../data/profileData';

// Context
import { useNSFW } from '../contexts/NSFWContext';
import { useTab, type TabType } from '../contexts/TabContext';

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
  HeartIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
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
              ? '0 0 0 6px var(--md-sys-color-background)' 
              : '0 0 0 1px var(--color-primary-muted)',
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
  const chip = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-[var(--color-primary-muted)] text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-all duration-200";

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-5">

        {/* Profile Image */}
        <div className="relative group flex-shrink-0 mx-auto sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-tertiary rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <img
            src={profileImageUrl}
            alt={displayName}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-[var(--color-primary-40)] group-hover:border-[var(--color-primary-70)] transition-all duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-center gap-3 text-center sm:text-left">

          {/* Name & Location */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-background leading-tight">{displayName}</h1>
            <p className="text-on-background/60 text-sm flex items-center gap-1.5 justify-center sm:justify-start mt-1">
              <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
              {location.region}, {location.country}
            </p>
          </div>

          {/* Row 1 – Personal: age · orientation · relationship · personality */}
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            <span className={chip}>
              <CakeIcon className="w-3 h-3 text-secondary" />
              {age} years
            </span>
            <span className={chip}>🏳️‍🌈 Gay</span>
            <span className={chip}>
              <HeartIcon className="w-3 h-3 text-primary" />
              {relationshipStatus}
            </span>
            <span className={chip}>
              <UserGroupIcon className="w-3 h-3 text-tertiary" />
              {personality}
            </span>
          </div>

          {/* Row 2 – Character: species · languages */}
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            <span className={chip}>
              <SparklesIcon className="w-3 h-3 text-primary" />
              {species}
            </span>
            {langs.map((lang) => (
              <span key={lang.id} className={chip}>
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

interface TabButtonProps {
  id: TabType;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: (tab: TabType) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, isActive, onClick }) => {
  const { trigger } = useHapticsWithAudio();
  
  return (
    <button
      onClick={() => {
        trigger('light');
        onClick(id);
      }}
      className={`
        flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'bg-[var(--color-primary-muted-strong)] text-primary border border-[var(--color-primary-30)]' 
          : 'bg-on-surface-5 text-on-surface-variant border border-on-surface-10 hover:bg-on-surface-10 hover:text-on-background'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

const SettingsTabButton: React.FC = () => {
  const { trigger } = useHapticsWithAudio();
  const { activeTab, setActiveTab } = useTab();

  return (
    <button
      onClick={() => {
        trigger('light');
        setActiveTab('settings');
      }}
      className={`
        flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
        ${activeTab === 'settings'
          ? 'bg-[var(--color-primary-muted-strong)] text-primary border border-[var(--color-primary-30)]'
          : 'bg-on-surface-5 text-on-surface-variant border border-on-surface-10 hover:bg-on-surface-10 hover:text-on-background'
        }
      `}
      title="Settings"
    >
      <Cog6ToothIcon className="w-4 h-4" />
      <span>Settings</span>
    </button>
  );
};

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
  const { trigger } = useHapticsWithAudio();
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
          onClick={() => trigger('light')}
          className={`
            flex relative rounded-xl overflow-hidden w-full
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
              <span className="text-[8px] uppercase tracking-wider text-primary font-medium block">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-on-background leading-tight whitespace-nowrap">{item.name}</h4>
              <p className="text-xs text-on-surface-variant leading-tight whitespace-nowrap">{item.spec}</p>
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
  const { trigger } = useHapticsWithAudio();
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
          onClick={() => trigger('light')}
          className={`
            flex relative rounded-xl overflow-hidden w-full
            bg-gradient-to-br ${platform.color || 'from-gray-500/20 to-gray-600/20'}
            border border-[var(--color-primary-muted)]
            ${isHovered ? 'border-[var(--color-primary-40)]' : ''}
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
              <h4 className="text-sm font-bold text-on-background leading-tight whitespace-nowrap">{platform.name}</h4>
              <p className="text-xs text-on-surface-variant leading-tight whitespace-nowrap">{platform.description}</p>
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
  const { trigger } = useHapticsWithAudio();
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
          onClick={() => trigger('light')}
          className={`
            flex relative rounded-xl overflow-hidden w-full
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
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg text-on-background flex-shrink-0" 
                style={{
                  transform: isHovered 
                    ? `scale(1.15) rotate(${initialIconRotation + 5}deg)` 
                    : `scale(1) rotate(${initialIconRotation}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                }}
              />
            )}
            <div className="flex-shrink-0">
              <h4 className="text-sm font-bold text-on-background leading-tight whitespace-nowrap">{getSocialDisplayName(account.socialNetwork)}</h4>
              <p className="text-xs text-on-surface-variant leading-tight whitespace-nowrap">{account.value}</p>
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
  const { trigger } = useHapticsWithAudio();
  
  const publicSocialAccounts = profile.socialAccounts.filter(
    (account: any) => account.accessPermission === 'public'
  );

  // Filter images based on NSFW preference
  const galleryImages = useMemo(() => {
    const publicImgs = profile.images.filter(
      (img: any) => img.accessPermission === 'public' && !img.isAd &&
                   img.image.uuid !== profile.profileImage.image.uuid // Exclude profile image
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
  }, [profile.images, profile.profileImage.image.uuid, nsfwEnabled]);

  const { activeTab, setActiveTab } = useTab();

  // Switch away from kinks tab if NSFW is disabled
  useEffect(() => {
    if (!nsfwEnabled && activeTab === 'kinks') {
      setActiveTab('gallery');
    }
  }, [nsfwEnabled, activeTab, setActiveTab]);

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

  // Preload tech setup images
  useEffect(() => {
    techSetup.forEach((item: any) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, []);

  // Preload platform images
  useEffect(() => {
    platforms.forEach((platform: any) => {
      if (platform.image) {
        const img = new Image();
        img.src = platform.image;
      }
    });
  }, []);

  // Preload social account icons
  useEffect(() => {
    publicSocialAccounts.forEach((account: any) => {
      const customIcon = getSocialCustomIcon(account.socialNetwork);
      if (customIcon) {
        const img = new Image();
        img.src = customIcon;
      }
      // FontAwesome icons don't need pre-caching as they're loaded via CSS
    });
  }, [publicSocialAccounts]);

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

    // Play whoosh sound immediately when image is clicked (before modal opens)
    playWhooshSound(0.5).catch(() => {
      // Silently fail if whoosh sound is unavailable
    });

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
    // Haptic feedback on image click
    trigger('light');
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
    <div className="min-h-screen bg-background text-on-background">
      <Banner imageUrl="/img/banner.JPEG" isModalOpen={isModalOpen} />

      {/* Scrollable Content Area */}
      <div className="relative z-10">
        {/* Empty space to push content below the banner */}
        <div className="h-[25vh]" />

        {/* Main Content with dark background */}
        <div className="bg-background min-h-[35vh] rounded-t-3xl shadow-lg pt-8 border-t border-[var(--color-primary-muted)] backdrop-blur-sm">
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
                    <SettingsTabButton />
                  </div>

                  {/* Tab Content */}
                  <div>
                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                      <div className="bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                          <h3 className="text-sm font-semibold text-on-surface">Gallery</h3>
                          <span className="text-xs text-on-surface-variant">({galleryImages.length})</span>
                        </div>
                        <div className={`relative z-0 px-2 pt-2 pb-2 gallery-masonry${isWebKit ? ' is-webkit' : ''}`}>
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
                      </div>
                    )}

                    {/* Kinks Tab (NSFW only) */}
                    {activeTab === 'kinks' && nsfwEnabled && (
                      <KinksTable />
                    )}

                    {/* Hardware Tab */}
                    {activeTab === 'tech' && (
                      <div className="bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                          <h3 className="text-sm font-semibold text-on-surface">Hardware</h3>
                          <span className="text-xs text-on-surface-variant">({techSetup.length})</span>
                        </div>
                        <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3">
                          {techSetup.map((item) => (
                            <TechGridCard
                              key={item.id}
                              item={item}
                              hoveredId={hoveredId}
                              setHoveredId={handleSetHoveredId}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Socials Tab */}
                    {activeTab === 'socials' && (
                      <div className="bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                          <h3 className="text-sm font-semibold text-on-surface">Socials</h3>
                          <span className="text-xs text-on-surface-variant">({publicSocialAccounts.length})</span>
                        </div>
                        <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3">
                          {publicSocialAccounts.map((account: any) => (
                            <SocialGridCard
                              key={account.id}
                              account={account}
                              hoveredId={hoveredId}
                              setHoveredId={handleSetHoveredId}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Platforms Tab */}
                    {activeTab === 'platforms' && (
                      <div className="bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                          <h3 className="text-sm font-semibold text-on-surface">Platforms</h3>
                          <span className="text-xs text-on-surface-variant">({platforms.length})</span>
                        </div>
                        <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3">
                          {platforms.map((platform) => (
                            <PlatformGridCard
                              key={platform.id}
                              platform={platform}
                              hoveredId={hoveredId}
                              setHoveredId={handleSetHoveredId}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && <SettingsContent />}
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
