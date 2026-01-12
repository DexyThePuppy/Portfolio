/**
 * Image and responsive utilities
 */

// ============================================================================
// RESPONSIVE BREAKPOINTS (Internal)
// ============================================================================

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ============================================================================
// RESPONSIVE CALCULATIONS
// ============================================================================

/**
 * Calculate number of visible items in gallery/carousel based on screen width
 */
export const getVisibleItems = (width: number): number => {
  if (width <= BREAKPOINTS.sm) return 3;
  if (width <= BREAKPOINTS.md) return 4;
  if (width <= BREAKPOINTS.lg) return 5;
  if (width <= BREAKPOINTS.xl) return 6;
  return 7;
};

/**
 * Calculate optimal image size for responsive loading
 * Rounds to nearest 50px increment for better CDN caching
 */
const calculateOptimalImageSize = (
  containerWidth: number,
  devicePixelRatio = window.devicePixelRatio || 1
): number => {
  const size = Math.round((containerWidth * devicePixelRatio) / 50) * 50;
  return Math.max(200, Math.min(800, size));
};

/**
 * Get gallery image size based on current viewport
 */
export const getGalleryImageSize = (): number => {
  const dpr = window.devicePixelRatio || 1;
  const columns = getVisibleItems(window.innerWidth);
  const baseSize = window.innerWidth / columns;
  return calculateOptimalImageSize(baseSize, dpr);
};

// ============================================================================
// IMAGE URL GENERATION
// ============================================================================

/**
 * Generate image URL with optional width parameter for responsive loading
 */
export const getModifiedImageUrl = (uuid: string, width?: number): string => {
  const columns = getVisibleItems(window.innerWidth);
  const containerWidth = window.innerWidth;
  
  const calculatedWidth =
    width ||
    calculateOptimalImageSize(Math.ceil(containerWidth / columns * 1.2));
  
  return `https://assets.barq.app/image/${uuid}.jpeg?width=${calculatedWidth}`;
};
