/**
 * Material Expressive 3 theme generator
 * Uses @material/material-color-utilities SchemeExpressive for a unified, playful
 * color system that creates harmonious primary, secondary, and tertiary palettes.
 */
import {
  SchemeExpressive,
  CorePalette,
  Hct,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

/** MD3 semantic color tokens to extract from the scheme */
const SCHEME_KEYS = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'surfaceVariant',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
] as const;

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export interface MaterialExpressiveThemeOptions {
  /** Source color (hex or rgb). Default: coral/salmon accent #FF8A80 */
  sourceColor?: string;
  /** Use dark scheme. Default: true for portfolio */
  isDark?: boolean;
  /** Contrast level -1 to 1. Default: 0 */
  contrastLevel?: number;
  /** Target element for CSS variables. Default: document.documentElement */
  target?: HTMLElement;
}

/**
 * Generates Material Expressive 3 color scheme and applies CSS custom properties.
 * Call once at app initialization.
 */
export function applyMaterialExpressiveTheme(options: MaterialExpressiveThemeOptions = {}): void {
  const {
    sourceColor = '#FF8A80', // Current portfolio accent - coral/salmon
    isDark = true,
    contrastLevel = 0,
    target = document.documentElement,
  } = options;

  const sourceArgb = sourceColor.startsWith('#')
    ? argbFromHex(sourceColor)
    : rgbToArgb(sourceColor);
  const sourceHct = Hct.fromInt(sourceArgb);
  const scheme = new SchemeExpressive(sourceHct, isDark, contrastLevel);

  // Use source color for primary (Expressive rotates 240° making it blue - override to keep coral accent)
  const corePalette = CorePalette.of(sourceArgb);
  const primaryOverrides: Record<string, number> = {
    primary: isDark ? corePalette.a1.tone(80) : corePalette.a1.tone(40),
    onPrimary: isDark ? corePalette.a1.tone(20) : corePalette.a1.tone(100),
    primaryContainer: isDark ? corePalette.a1.tone(30) : corePalette.a1.tone(90),
    onPrimaryContainer: isDark ? corePalette.a1.tone(90) : corePalette.a1.tone(10),
    inversePrimary: corePalette.a1.tone(40),
  };

  for (const key of SCHEME_KEYS) {
    const value = primaryOverrides[key as keyof typeof primaryOverrides]
      ?? (scheme as unknown as Record<string, number>)[key];
    if (value != null) {
      const cssVar = `--md-sys-color-${camelToKebab(key)}`;
      target.style.setProperty(cssVar, hexFromArgb(value));
    }
  }

  // Legacy accent aliases for gradual migration
  const primaryArgb = primaryOverrides.primary;
  target.style.setProperty('--color-accent', hexFromArgb(primaryArgb));
  target.style.setProperty('--color-accent-dark', hexFromArgb(primaryOverrides.primaryContainer));

  // Muted primary for subtle borders/shadows (from source-based primary)
  const r = ((primaryArgb >> 16) & 0xff);
  const g = ((primaryArgb >> 8) & 0xff);
  const b = (primaryArgb & 0xff);
  target.style.setProperty('--color-primary-muted', `rgba(${r}, ${g}, ${b}, 0.1)`);
  target.style.setProperty('--color-primary-muted-subtle', `rgba(${r}, ${g}, ${b}, 0.05)`);
  target.style.setProperty('--color-primary-muted-strong', `rgba(${r}, ${g}, ${b}, 0.2)`);
  target.style.setProperty('--color-primary-30', `rgba(${r}, ${g}, ${b}, 0.3)`);
  target.style.setProperty('--color-primary-40', `rgba(${r}, ${g}, ${b}, 0.4)`);
  target.style.setProperty('--color-primary-50', `rgba(${r}, ${g}, ${b}, 0.5)`);
  target.style.setProperty('--color-primary-70', `rgba(${r}, ${g}, ${b}, 0.7)`);

  // On-surface overlays for subtle borders/backgrounds (dark theme: light tint)
  const onSurfaceArgb = isDark ? scheme.onSurface : scheme.onBackground;
  const osR = ((onSurfaceArgb >> 16) & 0xff);
  const osG = ((onSurfaceArgb >> 8) & 0xff);
  const osB = (onSurfaceArgb & 0xff);
  target.style.setProperty('--color-on-surface-5', `rgba(${osR}, ${osG}, ${osB}, 0.05)`);
  target.style.setProperty('--color-on-surface-10', `rgba(${osR}, ${osG}, ${osB}, 0.1)`);
  target.style.setProperty('--color-on-surface-20', `rgba(${osR}, ${osG}, ${osB}, 0.2)`);
}

function rgbToArgb(rgb: string): number {
  const match = rgb.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (!match) return argbFromHex('#FF8A80');
  const [, r, g, b] = match.map(Number);
  return (255 << 24) | (r << 16) | (g << 8) | b;
}
