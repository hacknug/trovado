const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Var', ...defaultTheme.fontFamily.sans],
      },
    },

    aspectRatio: {
      'none': 0,
      'square': [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
  },

  variants: {
    margin: ['responsive', 'owl'],
  },

  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-aspect-ratio'),

    // Variants
    function ({ addVariant, e }) {
      addVariant('owl', ({ modifySelectors, separator, container }) => {
        modifySelectors(({ className }) => {
          return `.${e(`owl${separator}${className}`)} > * + *`
        })
      })
    },
  ],
}
