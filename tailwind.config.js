/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*/**/*.html", "*/**/*.js", "*/**/*.ts", "*/**/*.tsx", "*/**/*.ejs", "./app/styles/dist/index.min.css"],
  theme: {
    extend: {
      backdropBrightness: {
        25: ".25",
      }
    },
  },
  plugins: [],
}
