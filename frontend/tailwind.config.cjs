/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'primary': "#EEEEEE",
      'secondary': "#222831",
      'secondary-lg': '#393E46',
      'accent': "#00ADB5",
      'white': "#FFF",
      'black': "#000"
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
