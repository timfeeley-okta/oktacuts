module.exports = {
  purge: [
    './pages/**/*.tsx',
    './pages/**/*.html',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],

  theme: {
    extend: {
      colors: {
        oktaBlue: '#00297A',
        oktaMidGrey: '#AAAAB4',
      },
      spacing: {
        21: '5.5rem',
      },
      height: {
        120: '30rem',
      },
      width: {
        152: '38rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
