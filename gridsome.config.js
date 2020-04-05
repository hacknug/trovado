// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Trova.do',
  siteDescription: 'A safer way to shop during the quarantine.',

  templates: {
    Shop: '/shop/:id',
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Shop',
        path: './static/data/**/*.json',
      },
    },

    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: ['en', 'es'],
        fallbackLocale: 'en',
        messages: {
          en: require('./src/locales/en.json'),
          es: require('./src/locales/es.json'),
        },
      },
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['p', 'pv', 'lc', 'dr', 'cp'],
        collections: [
          {
            typeName: 'Shop',
            indexName: 'Shop',
            fields: ['p', 'pv', 'lc', 'dr', 'cp'],
          },
        ],
      },
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          whitelistPatternsChildren: [
            /mapbox/,
            /mapboxgl/,
            /notices/,
          ],
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: { id: process.env.GOOGLE_ANALYTICS_ID },
    },
  ]
}
