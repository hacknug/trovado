<template>
  <div class="flex flex-col min-h-screen bg-gray-100">

    <!-- <header class="sticky inset-x-0 top-0 z-30"> -->
      <SiteNavigation :siteName="$static.metadata.siteName" />
    <!-- </header> -->

    <router-view />

    <!-- <footer class="bg-checkers w-full border-t-2 border-white">
      <SiteFooter class="relative z-10" />
    </footer> -->

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

export default {
  components: { SiteNavigation },
}
</script>
