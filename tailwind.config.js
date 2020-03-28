module.exports = {
  theme: {
    extend: {},
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
