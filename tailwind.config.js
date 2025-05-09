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
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
      },
    },
  },
  plugins: [],
};
