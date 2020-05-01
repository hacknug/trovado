<template>
  <div class="flex flex-col flex-1 py-10">

    <header v-if="$slots.header">
      <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
        <h1 class="text-3xl font-bold leading-tight text-gray-900"><slot name="header" /></h1>
      </div>
    </header>

    <main class="flex flex-col flex-1">
      <div v-if="$slots.bleed" class="flex flex-col flex-1 -my-10">
        <slot name="bleed" />
      </div>

      <div v-if="$slots.default" class="max-w-7xl sm:px-6 lg:px-8 w-full mx-auto">
        <!-- Replace with your content -->
        <div class="sm:px-0 px-4 py-8">
          <slot/>
        </div>
        <!-- /End replace -->
      </div>
    </main>

  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
      siteDescription
      siteUrl
    }
  }
</static-query>

<script>
import SiteSEO from '~/mixins/SiteSEO'

export default {
  mixins: [SiteSEO],
}
</script>

<style lang="postcss">
  html {
    font-size: 14px;
    @screen md { font-size: 16px; }
  }

  .size-inherit {
    width: inherit;
    height: inherit;
  }
</style>
