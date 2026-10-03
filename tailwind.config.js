/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── NEW DESIGN SYSTEM ──────────────────────────────
        bg: '#F8F6F2',
        'bg-alt': '#F2EFEA',
        surface: '#FFFFFF',
        ink: '#1C1A17',
        'ink-2': '#6B6660',
        'ink-3': '#BAB5AE',
        accent: '#BF5B1A',
        'accent-hover': '#A34D15',
        'accent-tint': '#F5ECE4',
        rule: '#E4E0D9',

        // ── LEGACY (kept for any unrewritten pages) ────────
        brand: {
          canvas: '#F8F6F2',
          'light-grey': '#F2EFEA',
          'border-grey': '#E4E0D9',
          black: '#1C1A17',
          'dark-grey': '#6B6660',
          red: '#BF5B1A',
          'dark-red': '#A34D15',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['Geist', 'system-ui', 'sans-serif'],
        sans:    ['Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'text-xs':   ['11px', { lineHeight: '1.55', letterSpacing: '0.13em' }],
        'text-sm':   ['13px', { lineHeight: '1.55' }],
        'text-base': ['15px', { lineHeight: '1.72' }],
        'text-md':   ['17px', { lineHeight: '1.72' }],
        'text-lg':   ['20px', { lineHeight: '1.45' }],
        'text-xl':   ['28px', { lineHeight: '1.15' }],
        'text-2xl':  ['38px', { lineHeight: '1.15' }],
        'text-3xl':  ['52px', { lineHeight: '1.05' }],
        // Legacy display sizes
        'display-xl': ['110px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '400' }],
        'display-lg': ['80px',  { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '400' }],
        'display-md': ['64px',  { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '400' }],
        'display-sm': ['48px',  { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '400' }],
      },
      maxWidth: {
        content: '1040px',
        tight:   '640px',
      },
      spacing: {
        'sp-1':  '8px',
        'sp-2':  '16px',
        'sp-3':  '24px',
        'sp-4':  '32px',
        'sp-6':  '48px',
        'sp-8':  '64px',
        'sp-12': '96px',
        'sp-16': '128px',
        'sp-20': '160px',
      },
    },
  },
  plugins: [],
};
