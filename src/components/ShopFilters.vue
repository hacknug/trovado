<template>
  <div class="flex">

    <div class="owl:mt-5 bg-gray-50 w-full h-full max-w-xl p-5 pt-0 border-r border-gray-100 shadow">
      <header class="bg-gray-50 sticky top-0 z-10 p-5 -mx-5 border-b border-gray-100">
        <h2 class="sm:text-3xl sm:leading-9 sm:truncate text-2xl font-bold leading-7 text-gray-900">Closest Shops</h2>
      </header>
      <div class="owl:mt-5">
        <ShopCard v-for="{ node } in shops" :key="node.id" :shop="node" />
      </div>
    </div>

    <div class="sticky top-0 w-full max-h-screen">
      <ShopMap />
    </div>

  </div>
</template>

<script>
import ShopCard from '~/components/ShopCardMapbox'
import ShopMap from '~/components/ShopMap'

export default {
  name: 'ShopFilters',
  components: { ShopCard, ShopMap },
  props: {
    shops: {
      type: Array,
      required: false,
    },
  },
}
</script>

<style lang="postcss" scoped>
  header {
    top: 56px;
    @screen md { top: 64px; }
  }
</style>
