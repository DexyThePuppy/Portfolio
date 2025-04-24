/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6B6B',
        'secondary': '#1A1A1A',
        'gray-custom': '#2A2A2A',
      },
    },
  },
  plugins: [],
} 