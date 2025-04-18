/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722', // Orange color from the Edit Profile button
        secondary: '#1A1A1A', // Dark background color
        'gray-custom': '#2A2A2A', // Custom gray for cards
      },
    },
  },
  plugins: [],
} 