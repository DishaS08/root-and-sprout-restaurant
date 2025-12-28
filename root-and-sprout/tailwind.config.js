/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Vibrant Green
        secondary: "#8D6E63", // Earth Tone
        accent: "#E8F5E9", // Light Green Background
        dark: "#2E3D30", // Dark Green/Black for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
