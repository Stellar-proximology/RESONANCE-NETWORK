/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-purple': '#8B5CF6',
        'retro-pink': '#EC4899',
        'retro-cyan': '#06B6D4',
        'retro-green': '#10B981',
        'retro-yellow': '#F59E0B',
        'retro-red': '#EF4444',
        'pixel-dark': '#1F2937',
        'pixel-light': '#F3F4F6',
      },
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],
      },
      animation: {
        'pixel-bounce': 'bounce 1s infinite',
        'pixel-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pixel-spin': 'spin 1s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}