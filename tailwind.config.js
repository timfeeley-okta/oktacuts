module.exports = {
  purge: [
    './pages/**/*.tsx',
    './pages/**/*.html',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],

  theme: {
    extend: {
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
  plugins: [require('@tailwindcss/forms')],
}
