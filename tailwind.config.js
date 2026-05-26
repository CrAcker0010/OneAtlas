/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent — YC Orange. Use ONLY for CTAs, links, active states.
        primary: {
          50:  '#FFF4EE',
          100: '#FFE4CC',
          200: '#FFC599',
          300: '#FF9F66',
          400: '#FF7D33',
          500: '#FF6600', // Main CTA orange
          600: '#E65C00', // Hover orange
          700: '#CC5200',
          800: '#A34200',
          900: '#7A3100',
          950: '#3D1800',
        },
        // Surface / background palette
        surface: {
          warm:    '#F5F5EE', // Primary page background — THE most important token
          white:   '#FFFFFF', // Cards, modals, prompt boxes
          subtle:  '#FAFAFA', // Hover states on white
          muted:   '#F3F4F6', // Inactive areas
        },
        // Text hierarchy
        ink: {
          primary:   '#111111',
          secondary: '#6B7280',
          muted:     '#9CA3AF',
          disabled:  '#D1D5DB',
        },
        // Borders — all very thin and subtle
        border: {
          DEFAULT: '#E5E7EB',
          light:   '#ECECEC',
          strong:  '#D1D5DB',
        },
        // Status colors — desaturated, not neon
        status: {
          'green-bg':   '#F0FDF4',
          'green-text': '#15803D',
          'green-dot':  '#22C55E',
          'yellow-bg':  '#FEFCE8',
          'yellow-text':'#A16207',
          'yellow-dot': '#EAB308',
          'gray-bg':    '#F9FAFB',
          'gray-text':  '#6B7280',
          'gray-dot':   '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero':    ['72px',  { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
        'section': ['48px',  { lineHeight: '1',    letterSpacing: '-0.03em', fontWeight: '650' }],
        'card-h':  ['22px',  { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'body':    ['18px',  { lineHeight: '1.7',  fontWeight: '400' }],
        'label':   ['12px',  { lineHeight: '1',    letterSpacing: '0.08em',  fontWeight: '600' }],
      },
      borderRadius: {
        'sm':  '12px',
        'md':  '18px',
        'lg':  '24px',
        'xl':  '32px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        // Ultra-soft shadows only — no glow
        'card':      '0 1px 2px rgba(0,0,0,0.03)',
        'card-hover':'0 4px 24px rgba(0,0,0,0.06)',
        'soft':      '0 1px 2px rgba(0,0,0,0.02), 0 4px 24px rgba(0,0,0,0.03)',
        'panel':     '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
        'none':      'none',
      },
      maxWidth: {
        'layout': '1280px',
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        'fade-up-1':  'fadeUp 0.5s ease-out 0.1s forwards',
        'fade-up-2':  'fadeUp 0.5s ease-out 0.2s forwards',
        'fade-up-3':  'fadeUp 0.5s ease-out 0.3s forwards',
        'ticker':     'ticker 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};