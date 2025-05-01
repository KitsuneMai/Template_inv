/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-pink': '#fefefe',
        'hover-pink': '#ffe5e5',
        'dark-hover-pink': '#ffcccc',
        'highlight': '#a5684e',
        'secondary-hover': '#dd5191',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};