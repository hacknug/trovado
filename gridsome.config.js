// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Trovado',
  siteDescription: 'A safer way to shop during the quarantine.',
  siteUrl: process.env.NOW_URL || 'https://trovado.now.sh',

  plugins: [
    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: ['en', 'es'],
        fallbackLocale: 'en',
        messages: process.env.NODE_ENV === 'production' && {
          en: require('./src/locales/en.json'),
          es: require('./src/locales/es.json'),
        },
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
