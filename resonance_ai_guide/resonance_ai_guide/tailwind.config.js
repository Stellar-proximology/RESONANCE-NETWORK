/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'candy-pink': '#FFB6C1',
        'candy-blue': '#B6E5FF',
        'candy-purple': '#E6B6FF',
        'candy-yellow': '#FFFAB6',
        'candy-green': '#B6FFB6',
        'candy-orange': '#FFD4B6',
        'pastel-gradient-start': '#FFE5F1',
        'pastel-gradient-end': '#E5F3FF',
      },
      backgroundImage: {
        'pastel-gradient': 'linear-gradient(135deg, #FFE5F1 0%, #E5F3FF 100%)',
        'candy-gradient': 'linear-gradient(135deg, #FFB6C1 0%, #B6E5FF 50%, #E6B6FF 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'candy': '0 8px 32px rgba(255, 182, 193, 0.3)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}