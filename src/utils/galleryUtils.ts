/**
 * Gallery layout helpers + shared deterministic randomness
 */

// Generate a consistent "random" number from a string (0-1 range)
export const seededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs((Math.sin(hash) * 10000) % 1);
};

// Gallery column count – mirrors breakpoints in index.css (.gallery-masonry)
export const getGalleryColumnCount = (width: number): number => {
  if (width >= 1280) return 6;
  if (width >= 1024) return 5;
  if (width >= 768) return 4;
  if (width >= 640) return 3;
  return 2;
};

// CSS columns fill top-to-bottom per column; convert to left-to-right reading order for stagger
export const getGalleryStaggerIndex = (
  index: number,
  total: number,
  columnCount: number,
  isWebKit: boolean,
): number => {
  if (isWebKit) return index;
  const itemsPerColumn = Math.ceil(total / columnCount);
  const col = Math.floor(index / itemsPerColumn);
  const row = index % itemsPerColumn;
  return row * columnCount + col;
};

// True when the device has a real hover-capable pointer (mouse/trackpad).
// Used to skip JS hover effects on touch devices where mouseenter is emulated
// and would leave cards stuck in their hovered state.
export const supportsHover = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
