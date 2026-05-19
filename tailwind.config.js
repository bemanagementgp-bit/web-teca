/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        teca: {
          dark:   '#2C1A0E',
          brown:  '#6B4226',
          gold:   '#bfb18d',
          cream:  '#F5F0E8',
          light:  '#FAFAF7',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
