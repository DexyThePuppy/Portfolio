/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Material Expressive 3 - set at runtime by materialExpressiveTheme.ts */
        primary: 'var(--md-sys-color-primary, #6750a4)',
        'on-primary': 'var(--md-sys-color-on-primary, #ffffff)',
        'primary-container': 'var(--md-sys-color-primary-container, #eaddff)',
        'on-primary-container': 'var(--md-sys-color-on-primary-container, #21005d)',
        secondary: 'var(--md-sys-color-secondary, #625b71)',
        'on-secondary': 'var(--md-sys-color-on-secondary, #ffffff)',
        'secondary-container': 'var(--md-sys-color-secondary-container, #e8def8)',
        'on-secondary-container': 'var(--md-sys-color-on-secondary-container, #1d192b)',
        tertiary: 'var(--md-sys-color-tertiary, #7d5260)',
        'on-tertiary': 'var(--md-sys-color-on-tertiary, #ffffff)',
        'tertiary-container': 'var(--md-sys-color-tertiary-container, #ffd8e4)',
        'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container, #31111d)',
        background: 'var(--md-sys-color-background, #1c1b1f)',
        'on-background': 'var(--md-sys-color-on-background, #e6e1e5)',
        surface: 'var(--md-sys-color-surface, #1c1b1f)',
        'on-surface': 'var(--md-sys-color-on-surface, #e6e1e5)',
        'surface-container': 'var(--md-sys-color-surface-container, #211f26)',
        'surface-container-high': 'var(--md-sys-color-surface-container-high, #2b2930)',
        'surface-container-highest': 'var(--md-sys-color-surface-container-highest, #36343b)',
        'surface-variant': 'var(--md-sys-color-surface-variant, #49454f)',
        outline: 'var(--md-sys-color-outline, #938f99)',
        'outline-variant': 'var(--md-sys-color-outline-variant, #49454f)',
        error: 'var(--md-sys-color-error, #f44336)',
        'on-error': 'var(--md-sys-color-on-error, #ffffff)',
        scrim: 'var(--md-sys-color-scrim, #000000)',
        'on-surface-5': 'var(--color-on-surface-5)',
        'on-surface-10': 'var(--color-on-surface-10)',
        'on-surface-20': 'var(--color-on-surface-20)',
        'gray-custom': '#2A2A2A',
      },
    },
  },
  plugins: [],
} 