/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'black-pearl': '#18191a',
        'blue-charcoal': '#242526',
        'baltic-sea': '#3a3b3c'
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
}