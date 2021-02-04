const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: { colors },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
