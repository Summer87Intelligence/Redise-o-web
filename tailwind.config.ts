import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        surface: '#161B22',
        'surface-2': '#21262D',
        'border-subtle': '#30363D',
        'text-primary': '#F0F6FC',
        'text-secondary': '#8B949E',
        'text-muted': '#484F58',
        accent: '#2F81F7',
        'accent-hover': '#388BFD',
        success: '#3FB950',
        warning: '#D29922',
        danger: '#F85149',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(47,129,247,0.09) 0%, transparent 100%)',
        'accent-glow':
          'radial-gradient(ellipse at center, rgba(47,129,247,0.14) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, #161B22 0%, #0D1117 100%)',
        'section-alt': 'linear-gradient(180deg, #0D1117 0%, #0A0E14 100%)',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(48,54,61,0.6)',
        'card-hover':
          '0 4px 20px rgba(47,129,247,0.1), 0 0 0 1px rgba(47,129,247,0.25)',
        glow: '0 0 30px rgba(47,129,247,0.25)',
        'glow-sm': '0 0 16px rgba(47,129,247,0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1.1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
