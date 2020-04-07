import config from '~/.temp/config.js'

export default {
  computed: {
    metaData () {
      return this.$static ? this.$static.metadata : {}
    },
    metaTitle () {
      const pageTitle = this.$parent && this.$parent.$metaInfo && this.$parent.$metaInfo.title

      return {
        content: pageTitle || this.metaData.siteName,
        ...pageTitle ? { template: config.titleTemplate } : {},
      }
    },
    metaDescription () {
      return { content: this.metaData.siteDescription }
    },
    metaImage () {
      return { content: `${this.metaData.siteUrl}/img/banner.png` }
    },
    metaLogo () {
      return { content: `${this.metaData.siteUrl}/img/touchicon.png` }
    },
    metaUrl () {
      return { content: `${this.metaData.siteUrl}${this.$route && this.$route.path}` }
    },
    // metaSite () {
    //   return { content: this.metaData.twitter.site }
    // },
    // metaCreator () {
    //   return { content: this.metaData.twitter.creator }
    // },
  },
  metaInfo () {
    return {
      meta: [
        // { key: 'description', name: 'description', content: this.metaDescription },

        { key: 'og:type', property: 'og:type', content: 'website' },
        { key: 'og:title', property: 'og:title', ...this.metaTitle },
        { key: 'og:description', property: 'og:description', ...this.metaDescription },
        { key: 'og:image', property: 'og:image', ...this.metaImage },
        { key: 'og:logo', property: 'og:logo', ...this.metaLogo },
        { key: 'og:url', property: 'og:url', ...this.metaUrl },
        // TODO: Add `article:modified_time` to let Google know when the page was last updated

        { key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { key: 'twitter:title', name: 'twitter:title', ...this.metaTitle },
        { key: 'twitter:description', name: 'twitter:description', ...this.metaDescription },
        { key: 'twitter:image', name: 'twitter:image', ...this.metaImage },
        { key: 'twitter:url', name: 'twitter:url', ...this.metaUrl },
        // { key: 'twitter:site', name: 'twitter:site', ...this.metaSite },
        // { key: 'twitter:creator', name: 'twitter:creator', ...this.metaCreator },
      ],
    }
  },
}
