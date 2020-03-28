<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

    <header class="sticky inset-x-0 top-0 z-30">
      <SiteNavigation :siteName="$static.metadata.siteName" />
    </header>

    <router-view />

    <footer class="w-full mt-auto">
      <SiteFooter :siteName="$static.metadata.siteName" />
    </footer>

    <!-- <portal-target name="modal" /> -->

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
import SiteNavigation from '~/components/site/SiteNavigation'
import SiteFooter from '~/components/site/SiteFooter'

export default {
  components: { SiteNavigation, SiteFooter },
}
</script>
