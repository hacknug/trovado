const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    margin: ['responsive', 'owl'],
  },

  plugins: [
    require('@tailwindcss/ui'),

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
