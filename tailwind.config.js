/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050d1a',
          2: '#080f1e',
          3: '#0a1525',
          4: '#0d1c30',
        },
        blue: {
          DEFAULT: '#1a6fe8',
          2: '#3b9eff',
          3: '#6bbfff',
        },
        emerald: {
          DEFAULT: '#00d4a0',
          2: '#00f0b5',
        },
        muted: '#7090b0',
        dim: '#3a5070',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-live': 'pulse-live 2s ease infinite',
        'badge-shine': 'badge-shine 3.5s ease-in-out 2s infinite',
        'orb-a': 'orb-a 14s ease-in-out infinite alternate',
        'orb-b': 'orb-b 18s ease-in-out infinite alternate',
        'grid-drift': 'grid-drift 20s ease-in-out infinite alternate',
        'scan-sweep': 'scan-sweep 5s cubic-bezier(.4,0,.2,1) 2.5s infinite',
        'mouse-scroll': 'mouse-scroll 1.8s ease infinite',
        'float-badge-a': 'float-badge-a 4s ease-in-out infinite alternate',
        'float-badge-b': 'float-badge-b 4s ease-in-out infinite alternate',
        'mock-grow': 'mock-grow 2s ease infinite alternate',
        'depth-breathe': 'depth-breathe 6s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.5', transform: 'scale(.75)' },
        },
        'badge-shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'orb-a': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(60px,40px) scale(1.12)' },
        },
        'orb-b': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(-40px,-50px) scale(1.08)' },
        },
        'grid-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '32px 32px' },
        },
        'scan-sweep': {
          '0%': { top: '-2px', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '.4' },
          '100%': { top: '100%', opacity: '0' },
        },
        'mouse-scroll': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'float-badge-a': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-14px) translateX(4px)' },
        },
        'float-badge-b': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-10px) translateX(-4px)' },
        },
        'mock-grow': {
          '0%': { opacity: '.7' },
          '100%': { opacity: '1' },
        },
        'depth-breathe': {
          '0%': { transform: 'translate(-50%,-50%) scale(1)' },
          '100%': { transform: 'translate(-50%,-50%) scale(1.04)' },
        },
      },
      backgroundImage: {
        'glass': 'rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
};
