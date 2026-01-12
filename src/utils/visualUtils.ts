/**
 * Visual utilities: icons, rotations, and backgrounds
 */

// ============================================================================
// GRAIN TEXTURE
// ============================================================================

/**
 * Grain texture SVG data URL for overlay effects
 * Used in tech cards, platform cards, and social links
 */
export const GRAIN_TEXTURE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

// ============================================================================
// ICON UTILITIES
// ============================================================================

/**
 * Generate a hash from a string for deterministic randomness
 */
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

/**
 * Generate icon rotation styles (default and hover) based on a seed
 * Ensures default and hover rotations are noticeably different (at least 8 degrees apart)
 */
export const getIconStyles = (id: string, title: string): React.CSSProperties => {
  const seed = hashString(id + title + 'icon');
  const rotation = ((seed * 23) % 16) - 8; // -8 to 8 degrees

  // Ensure hover rotation is noticeably different (at least 8 degrees apart)
  let hoverRotation = ((seed * 41) % 20) - 10;
  const diff = Math.abs(hoverRotation - rotation);
  if (diff < 8) {
    hoverRotation = rotation > 0 ? rotation - 12 : rotation + 12;
  }

  return {
    '--icon-rotation': `${rotation}deg`,
    '--icon-hover-rotation': `${hoverRotation}deg`,
  } as React.CSSProperties;
};

/**
 * Generate consistent random background styles based on item id and name
 * Used for tech cards and similar components with background images
 */
export const getBackgroundStyles = (id: string, name: string): React.CSSProperties => {
  const seed = hashString(id + name + 'bg');
  const rotation = ((seed * 37) % 60) - 30; // -30 to 30 degrees
  const scale = 1.3 + ((seed * 13) % 50) / 100; // 1.3 to 1.8
  const offsetX = ((seed * 17) % 60) - 30; // -30% to 30%
  return {
    transform: `rotate(${rotation}deg) scale(${scale}) translateX(${offsetX}%)`,
  };
};
