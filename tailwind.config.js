const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Var', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        inherit: 'inherit',
      },
    },

    container: {
      center: true,
    },
    aspectRatio: {
      'none': 0,
      'square': [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
    filter: {
      blur: 'blur(0.125rem)',
    },
    backdropFilter: {
      blur: 'blur(0.25rem)',
    },
  },

  variants: {
    borderRadius: ['responsive', 'last'],
    borderWidth: ['responsive', 'owl'],
    margin: ['responsive', 'owl'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
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
