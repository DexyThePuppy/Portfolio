import React, { useState, useCallback } from 'react';
import type { ProfileImage } from '../types/index';
import { ANIMATION_TIMINGS, Z_INDEX, GALLERY } from '../constants';
import { supportsHover } from '../utils/galleryUtils';

export type GalleryClickEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.KeyboardEvent<HTMLDivElement>;

interface GalleryItemProps {
  photo: ProfileImage;
  index: number;
  staggerIndex: number;
  isLoaded: boolean;
  optimalSize: number;
  displayName: string;
  getModifiedImageUrl: (uuid: string, width?: number) => string;
  onImageClick: (photo: ProfileImage, index: number, e: GalleryClickEvent, rotation: number) => void;
  isLifted: boolean;
  isDropping: boolean;
  isHovered: boolean;
  setHoveredId: (id: string | null) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = React.memo(({
  photo,
  index,
  staggerIndex,
  isLoaded,
  optimalSize,
  displayName,
  getModifiedImageUrl,
  onImageClick,
  isLifted,
  isDropping,
  isHovered,
  setHoveredId,
}) => {
  // Generate a new random rotation on every hover
  const [rotation, setRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);

  const activateHover = useCallback(() => {
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

  const deactivateHover = useCallback(() => {
    setHoveredId(null);
    setInnerRotation(0);
    // Delay rotation reset to match scale transition
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  // Skip emulated mouseenter on touch devices (would leave items stuck hovered)
  const handleMouseEnter = useCallback(() => {
    if (!supportsHover()) return;
    activateHover();
  }, [activateHover]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    onImageClick(photo, index, e, rotation);
  }, [photo, index, onImageClick, rotation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    onImageClick(photo, index, e, rotation);
  }, [photo, index, onImageClick, rotation]);

  return (
    <div
      className={`gallery-item-wrapper${isLifted ? ' gallery-item-wrapper--lifted' : ''}`}
      style={{
        zIndex: isHovered ? Z_INDEX.GALLERY_HOVERED : Z_INDEX.BASE,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={deactivateHover}
      onFocus={activateHover}
      onBlur={deactivateHover}
    >
      <div
        className={`gallery-item rounded-xl cursor-pointer relative ${
          isLoaded ? 'thumbnail-loaded' : ''
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View ${displayName}'s photo ${index + 1}`}
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
          className="gallery-fly-in rounded-xl overflow-hidden"
          style={{
            boxShadow: isHovered
              ? '0 0 0 6px var(--md-sys-color-background)'
              : '0 0 0 1px var(--color-primary-muted)',
            transition: 'box-shadow 300ms ease-out',
            animationDelay: `${Math.min(staggerIndex, 20) * 35}ms`,
          }}
        >
          <img
            src={getModifiedImageUrl(photo.image.uuid, optimalSize)}
            alt={`${displayName}'s photo ${index + 1}`}
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
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

export default GalleryItem;
