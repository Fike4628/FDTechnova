/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0a1628',
        },
        accent: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        /* dark palette — used as bg-dark-500, bg-dark-600 etc. in JSX only */
        dark: {
          400: '#334155',
          500: '#1e293b',
          600: '#0d1426',
          700: '#111827',
          800: '#0a0f1e',
          900: '#060c1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card:         '0 2px 20px 0 rgba(10,22,40,0.10)',
        'card-hover': '0 8px 40px 0 rgba(37,99,235,0.22)',
        glow:         '0 0 24px 0 rgba(37,99,235,0.40)',
        'glow-sm':    '0 0 12px 0 rgba(37,99,235,0.28)',
      },
      backgroundImage: {
        'hero-gradient':  'linear-gradient(135deg, #0a1628 0%, #1e3a8a 55%, #1d4ed8 100%)',
        'dark-gradient':  'linear-gradient(180deg, #0a0f1e 0%, #111827 100%)',
        'card-gradient':  'linear-gradient(145deg, #0d1426 0%, #060c1a 100%)',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.65s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':       'fadeIn 0.45s ease both',
        'slide-in-left': 'slideInLeft 0.65s cubic-bezier(0.22,1,0.36,1) both',
        'float':         'float 4s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 12px 0 rgba(37,99,235,0.25)' },
          '50%':     { boxShadow: '0 0 28px 0 rgba(37,99,235,0.55)' },
        },
      },
    },
  },
  plugins: [],
}
