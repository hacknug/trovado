// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Charcuterio',

  templates: {
    Mercadona: '/shops/:id',
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Mercadona',
        path: './static/data/**/*.json',
      },
    },

    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: ['en', 'es'],
        fallbackLocale: 'en',
        defaultLocale: 'en',
        messages: {
          'en': require('./src/locales/en.json'),
          'es': require('./src/locales/es.json'),
        },
      },
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          whitelistPatternsChildren: [/mapbox/, /mapboxgl/],
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: { id: 'UA-159162278-2' },
    },
  ]
}
