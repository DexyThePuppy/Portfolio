/**
 * Global constants used throughout the application
 */

// Animation timings (in milliseconds)
export const ANIMATION_TIMINGS = {
  HOVER_DELAY: 300,
  ROTATION_RESET: 200,
  MODAL_CLOSE: 300,
  SCALE_DROP: 100,
  INNER_ROTATION_DELAY: 150,
} as const;

// Z-index layers
export const Z_INDEX = {
  BASE: 1,
  GALLERY_HOVERED: 30,
  MODAL_BACKDROP: 50,
  MODAL_CONTENT: 55,
  MODAL_CLOSE: 60,
  MODAL_LOADING: 70,
} as const;

// Image quality presets
export const IMAGE_SIZES = {
  MEDIUM: 1000,
  HIGH: 2000,
} as const;

// Gallery settings
export const GALLERY = {
  GAP: 8, // pixels
  HOVER_SCALE: 1.15,
  DROP_SCALE: 0.95,
  INNER_HOVER_SCALE: 1.15,
} as const;

// Modal padding
export const MODAL_PADDING = 80;

// Banner parallax settings
export const BANNER = {
  HEIGHT: '50vh',
  EXTRA_HEIGHT: 100, // Extra px for parallax movement
  PARALLAX_SPEED: -0.2,
  SCROLL_SMOOTHING: 0.075,
  SCROLL_THRESHOLD: 0.1,
  INITIAL_OFFSET: -50,
} as const;
