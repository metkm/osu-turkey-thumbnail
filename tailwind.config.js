const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        red: {
          "primary": "#ff3a3b"
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
