/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'b-blue': '#00deed',
        'grass': '#588f58'
      }
    },
  },
  plugins: [],
}
