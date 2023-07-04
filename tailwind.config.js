/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
}
