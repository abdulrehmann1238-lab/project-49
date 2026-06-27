/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FCFAF7',
          warmWhite: '#F8F6F0',
          sand: '#E6DFD3',
          stone: '#7C756B',
          charcoal: '#1E201E',
          sage: '#B2C4B2',
          forest: '#3F4E3F',
          ocean: '#4B6B7C',
          sky: '#CBD9E0',
          gold: '#C4A46D',
          terracotta: '#D48C70',
        },
        dark: {
          bg: '#141514',
          card: '#1F211F',
          border: '#2C2E2C',
          text: '#E1E3E1',
          muted: '#8D908D'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(124, 117, 107, 0.08)',
        'premium-lg': '0 10px 30px -5px rgba(124, 117, 107, 0.12)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
