/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
        mono: ['Courier Prime', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#160f04',
          50: '#f9f4ec',
          100: '#ede0c6',
          200: '#d4bc90',
          300: '#b89660',
          400: '#9a7a3a',
          500: '#7d5f22',
          600: '#634a16',
          700: '#4a370e',
          800: '#312408',
          900: '#160f04',
        },
        parchment: {
          DEFAULT: '#f4e8d0',
          50: '#fdfaf4',
          100: '#f4e8d0',
          200: '#e0c99a',
          300: '#c9a84c',
        },
        crimson: { DEFAULT: '#8b1a1a', light: '#b52424', dark: '#5c0f0f' },
        gold: { DEFAULT: '#c9a84c', light: '#e8c96d', dark: '#9a7a30' },
      },
    },
  },
  plugins: [],
};
