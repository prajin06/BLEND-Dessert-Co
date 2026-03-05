/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#fff1f3', 100: '#ffe0e5', 200: '#ffc6cf', 300: '#ff9dac', 400: '#FF8FA3', 500: '#ff4d6d', 600: '#ed1d4a', 700: '#c8133c', 800: '#a71339', 900: '#8e1436' },
        cream: { 50: '#FFFBF5', 100: '#FFF8ED', 200: '#FFF1E6', 300: '#FFE4CC', 400: '#FFD4A8', 500: '#FFC285' },
        chocolate: { 50: '#f6f0ee', 100: '#e8dbd6', 200: '#d1b7ad', 300: '#b89384', 400: '#9e705c', 500: '#7a5547', 600: '#5A3E36', 700: '#4a3228', 800: '#3a271f', 900: '#2a1c16' },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
