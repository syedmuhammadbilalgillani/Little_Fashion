/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ], darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xs': { 'min': '50px', 'max': '576px' },
        'sm': { 'min': '576px', 'max': '767px' },
        'md': { 'min': '768px', 'max': '991px' },
        'lg': { 'min': '992px', 'max': '1200px' },
        '1xl': { 'min': '1200px', 'max': '1535px' },
        '2xl': { 'min': '999px' },
      },
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}

