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
    pointerEvents: ['responsive', 'children'],
  },

  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-aspect-ratio'),

    require('tailwindcss-filters'),
    require('@hacknug/tailwindcss-alpha')({
      modules: {
        // textColor: true,
        backgroundColor: true,
        // borderColor: true,
        // placeholderColor: {
        //   prefixes: ['placeholder'],
        //   properties: ['color'],
        //   fallbacks: ['textColors'],
        //   process: false,
        // },
      },
    }),

    // Variants
    require('tailwindcss-children'),
    function ({ addVariant, e }) {
      addVariant('owl', ({ modifySelectors, separator, container }) => {
        modifySelectors(({ className }) => {
          return `.${e(`owl${separator}${className}`)} > * + *`
        })
      })
    },
  ],
}
