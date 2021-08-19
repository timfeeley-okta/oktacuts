module.exports = {
  purge: [
    './pages/**/*.tsx',
    './pages/**/*.ts',
    './pages/**/*.html',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],

  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
