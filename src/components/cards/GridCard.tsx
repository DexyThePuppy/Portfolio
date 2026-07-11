import React, { useState, useRef, useCallback } from 'react';
import { ANIMATION_TIMINGS, Z_INDEX, GALLERY } from '../../constants';
import { supportsHover } from '../../utils/galleryUtils';

interface GridCardProps {
  children: React.ReactNode;
  isHovered: boolean;
  rotation: number;
}

export const GridCard: React.FC<GridCardProps> = ({ children, isHovered, rotation }) => (
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

/**
 * Shared hover/focus behavior for grid cards: measures card width, derives a
 * playful rotation from it, and reports hover state to the parent. Hover is
 * skipped on touch devices (emulated mouseenter would stick), while focus
 * gives keyboard users the same lift effect.
 *
 * Note: cards receive a precomputed `isHovered` boolean (not the raw hovered
 * id), so React.memo prevents unrelated cards from re-rendering on hover.
 */
export const useGridCardHover = (
  hoverId: string,
  setHoveredId: (id: string | null) => void,
) => {
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const activate = useCallback(() => {
    setHoveredId(hoverId);
    // Measure lazily on hover instead of at mount: measuring in a mount
    // effect forced a second render of every card during the fly-in and
    // needed a resize listener per card.
    const width = cardRef.current?.offsetWidth ?? 0;
    const baseRotation = getRotationForWidth(width);
    const randomRange = Math.random() * 1;
    const direction = Math.random() < 0.5 ? 1 : -1;
    setRotation((baseRotation + randomRange) * direction);
  }, [hoverId, setHoveredId]);

  const deactivate = useCallback(() => {
    setHoveredId(null);
    setTimeout(() => setRotation(0), ANIMATION_TIMINGS.HOVER_DELAY);
  }, [setHoveredId]);

  const handleMouseEnter = useCallback(() => {
    if (!supportsHover()) return;
    activate();
  }, [activate]);

  return {
    cardRef,
    rotation,
    handleMouseEnter,
    handleMouseLeave: deactivate,
    handleFocus: activate,
    handleBlur: deactivate,
  };
};
