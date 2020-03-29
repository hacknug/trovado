<template>
  <div class="bg-gray-50 lg:py-24 py-16 overflow-hidden">
    <BaseContainer>
      <svg class="lg:block left-full -translate-y-1/4 absolute hidden transform -translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
        <defs>
          <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
      </svg>

      <div class="relative">
        <h3 class="sm:text-4xl sm:leading-10 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900">
          <ClientOnly>
            A <vue-typer :text="['better', 'safer']" initialAction="erasing" /> way to shop during quarantine
          </ClientOnly>
        </h3>
        <p class="max-w-3xl mx-auto mt-4 text-xl leading-7 text-center text-gray-500">
          We want to reduce people’s exposure to the COVID-19 by letting people know whether the items they’re looking for are available in their nearest supermarket.
        </p>
      </div>

      <div class="sm:rounded-lg relative mt-12 overflow-hidden bg-white shadow">
        <div class="aspect-ratio-16/9">
          <ShopMap
            :shops="shops"
            :filteredShops="filteredShops"
            class="sm:rounded-lg absolute inset-0 w-full h-full"
            style="position: absolute;"
          />
        </div>
      </div>

    </BaseContainer>
  </div>
</template>

<script>
import BaseContainer from '~/components/base/BaseContainer'
import ShopMap from '~/components/ShopMap'

export default {
  name: 'HeroMap',
  components: {
    BaseContainer,
    ShopMap,
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
  },
  props: {
    shops: {
      type: Array,
      required: true,
    },
    filteredShops: {
      type: Array,
      required: false,
    },
  },
}
</script>
