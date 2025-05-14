import React from 'react';
import { ProfileImage } from '../types';

interface ImageItemProps {
  image: ProfileImage;
  index: number;
  isLoaded?: boolean;
  cacheBuster?: string | null;
  ref: (el: HTMLDivElement | null) => void;
  onClick: () => void;
  getModifiedImageUrl: (uuid: string, size?: number) => string;
  onImageLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  variant: 'carousel' | 'gallery';
  
  // Carousel specific props
  itemWidth?: number;
  isAnimating?: boolean;
  profileName?: string;
  
  // Gallery specific props
  getMinHeight?: () => string;
  optimalSize?: number;
}

// Unified component for both carousel and gallery items
const ImageItem = React.memo(React.forwardRef<HTMLDivElement, ImageItemProps>((
  {
    image,
    index,
    isLoaded = false,
    cacheBuster = null,
    onClick,
    getModifiedImageUrl,
    onImageLoad = () => {},
    variant,
    
    // Carousel specific props
    itemWidth = 0,
    isAnimating = false,
    profileName = '',
    
    // Gallery specific props
    getMinHeight = () => '100%',
    optimalSize = 400,
  }, 
  ref
) => {
  // Shared memoized values
  const imageUrl = React.useMemo(() => 
    variant === 'gallery' 
      ? getModifiedImageUrl(image.image.uuid, optimalSize)
      : getModifiedImageUrl(image.image.uuid),
    [image.image.uuid, getModifiedImageUrl, variant, optimalSize, cacheBuster]
  );
  
  // Different container styles based on variant
  const containerStyle = React.useMemo(() => {
    if (variant === 'carousel') {
      return {
        width: `${itemWidth}px`,
        height: `${itemWidth}px`,
        flexShrink: 0 as const,
      };
    } else {
      return {
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        paddingBottom: getMinHeight(),
        position: 'relative' as const,
        minHeight: '100px',
        backgroundColor: 'rgba(255,138,128,0.05)'
      };
    }
  }, [variant, itemWidth, getMinHeight]);
  
  // Handle click with variant-specific behavior
  const handleClick = React.useCallback(() => {
    if (variant === 'carousel' && isAnimating) return;
    onClick();
  }, [onClick, variant, isAnimating]);
  
  if (variant === 'carousel') {
    return (
      <div
        className={`carousel-item relative z-20 cursor-pointer overflow-hidden ${isLoaded ? 'thumbnail-loaded' : ''}`}
        onClick={handleClick}
        ref={ref}
        style={containerStyle}
      >
        <img
          src={imageUrl}
          alt={`${profileName}'s photo ${index + 1}`}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 6 ? "high" : "auto"}
          draggable="false"
          className="w-full h-full object-cover pointer-events-auto transition-transform duration-300 hover:scale-110"
          onLoad={onImageLoad}
        />
      </div>
    );
  }
  
  // Gallery variant
  return (
    <div
      key={image.id + (cacheBuster || '')}
      ref={ref}
      className={`mb-1.5 lg:mb-1.5 inline-block w-full ${isLoaded ? 'thumbnail-loaded' : ''}`}
      onClick={handleClick}
    >
      <div 
        className="rounded-xl ring-1 ring-[rgb(255,138,128)]/10 hover:ring-[rgb(255,138,128)]/30 transition duration-300 overflow-hidden cursor-pointer transform hover:scale-105 will-change-transform" 
        style={containerStyle}
      >
        <div className="overflow-hidden absolute inset-0">
          <img
            src={imageUrl}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
            decoding="async"
            fetchPriority={index < 6 ? "high" : "auto"}
            key={cacheBuster || undefined}
            onLoad={onImageLoad}
          />
        </div>
      </div>
    </div>
  );
}));

// Add display name for debugging purposes
ImageItem.displayName = 'ImageItem';

export default ImageItem; 