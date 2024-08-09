/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      colors: {
        purple: '#835AFD',
        purpleHover: '#6F4BD8',
        red: '#E73F5D',
        redHover: '#D73754',
        grayLight: '#DBDCDD',
        grayLightHover: '#CECECE', 
        grayDark: '#737380',
        black: '#29292E',
        whiteBg: '#F8F8F8',
      }
    }
  },
  plugins: [],
}