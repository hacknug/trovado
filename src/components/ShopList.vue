<template>
  <div class="bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 relative px-4 pt-16 pb-20">

    <div class="absolute inset-0">
      <div class="h-1/3 sm:h-2/3 bg-white"></div>
    </div>

    <div class="max-w-7xl relative mx-auto">

      <div class="text-center">
        <h2 class="sm:text-4xl sm:leading-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900">From the blog</h2>
        <p class="sm:mt-4 max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.</p>
      </div>

      <div class="lg:grid-cols-3 lg:max-w-none grid max-w-lg gap-5 mx-auto mt-12">
        <ShopCard v-for="{ node } in shops" :key="node.id" :shop="node" />
      </div>

    </div>

  </div>
</template>

<script>
import ShopCard from '~/components/ShopCard'

export default {
  name: 'ShopList',
  components: { ShopCard },
  props: {
    shops: {
      type: Array,
      required: true,
    },
  },
}
</script>
