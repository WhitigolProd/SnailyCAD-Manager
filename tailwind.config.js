/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*/**/*.html", "*/**/*.js", "*/**/*.ts", "*/**/*.tsx", "*/**/*.ejs", "./src/styles/_util.scss"],
  theme: {
    extend: {
      backdropBrightness: {
        25: ".25",
      }
    },
  },
  plugins: [],
}
