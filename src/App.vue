<template>
  <div class="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-gray-100">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

    <header class="sticky inset-x-0 top-0 z-30">
      <SiteNavigation :siteName="$static.metadata.siteName" />
    </header>

    <router-view />

    <footer class="w-full mt-auto">
      <SiteFooter :siteName="$static.metadata.siteName" />
    </footer>

    <portal-target name="modal" />

  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
  }
</static-query>

<script>
import { mapActions } from 'vuex'

import SiteNavigation from '~/components/site/SiteNavigation'
import SiteFooter from '~/components/site/SiteFooter'

const { auth } = process.isClient ? require('~/firebase') : import('~/firebase')

export default {
  components: { SiteNavigation, SiteFooter },
  metaInfo () {
    const metaInfo = { meta: [] }
    const { siteName, siteDescription } = this.$static.metadata

    if (siteName) {
      metaInfo.title = siteName
    }

    if (siteDescription) {
      metaInfo.meta.push({
        key: 'description',
        name: 'description',
        content: siteDescription,
      })
    }

    return metaInfo
  },
  methods: {
    ...mapActions(['BIND_USER']),
  },
  async mounted () {
    auth.onAuthStateChanged((user) => this.BIND_USER(user))
  },
}
</script>
