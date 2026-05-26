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
        primary: {
          50: '#f0eeff',
          100: '#e0dcff',
          200: '#c4baff',
          300: '#a08dff',
          400: '#7c60ff',
          500: '#635bff',
          600: '#5148db',
          700: '#3f38b0',
          800: '#2e2a82',
          900: '#0A2540',
          950: '#050d1f',
        },
        accent: {
          pink: '#ff5996',
          'pink-light': '#ff85b3',
          orange: '#FFB17A',
          teal: '#00D4B1',
          cyan: '#00D4FF',
          yellow: '#F8BC42',
          green: '#00A37A',
          blue: '#00B8E6',
          purple: '#8b5cf6',
        },
        dark: {
          50: '#1a1a2e',
          100: '#16162a',
          200: '#121222',
          300: '#0e0e1c',
          400: '#0a0a14',
          500: '#070710',
        },
        slate: {
          heading: '#e2e8f0',
          body: '#94a3b8',
          muted: '#475569',
          light: '#f8fafc',
        },
        border: {
          light: 'rgba(255,255,255,0.06)',
          medium: 'rgba(255,255,255,0.1)',
          lighter: 'rgba(255,255,255,0.04)',
        },
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #635BFF, #8b5cf6, #FF5996, #FF9173)',
        'gradient-dark': 'linear-gradient(135deg, #0d0d1a, #1a1a2e)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,91,255,0.1), rgba(255,89,150,0.05))',
        soft: 'linear-gradient(135deg, rgba(99, 91, 255, 0.05), rgba(255, 89, 150, 0.05))',
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,91,255,0.4) 0%, transparent 80%)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out 2s infinite',
        'pulse-ring': 'pulse-ring 2s infinite',
        'gradient': 'gradientShift 4s ease infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'slide-left': 'slideInLeft 0.5s ease-out',
        'ticker': 'ticker 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(99, 91, 255, 0.4)' },
          '70%': { boxShadow: '0 0 0 20px rgba(99, 91, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(99, 91, 255, 0)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        nav: '20px',
        xs: '4px',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(99, 91, 255, 0.2)',
        'glow': '0 0 40px rgba(99, 91, 255, 0.3)',
        'glow-lg': '0 0 80px rgba(99, 91, 255, 0.4)',
        'glow-pink': '0 0 40px rgba(255, 89, 150, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 60px rgba(99, 91, 255, 0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};