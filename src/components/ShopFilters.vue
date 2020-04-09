<template>
  <div class="md:flex-row flex flex-col-reverse flex-1">

    <div class="owl:mt-5 bg-gray-50 z-10 flex-grow w-full max-w-lg p-5 pt-0 border-r border-gray-100 shadow">
      <header class="relative sticky top-0 z-10 -mx-5">
        <div class="bg-gray-50 md:p-5 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="owl:ml-2 flex">
            <h2 class="sm:text-3xl sm:leading-9 sm:truncate text-2xl font-bold leading-7 text-gray-900">Closest Shops</h2>
            <p class="sm:text-3xl sm:leading-9 sm:truncate text-2xl font-bold leading-7 text-blue-600">{{ Object.keys(shops).length }}</p>
          </div>
          <div class="owl:ml-2 flex">
            <BaseButton @click.native="showFilters = !showFilters" variant="secondary" size="sm">
              <template slot="icon"><FilterIcon class="w-5 h-5 stroke-current" /></template> Filter Shops
            </BaseButton>
          </div>
        </div>
        <div v-if="showFilters" class="top-full md:p-5 bg-gray-50 absolute inset-x-0 z-0 w-full px-4 py-3 border-b border-gray-200">
          <dl class="owl:mt-6">
            <div class="owl:mt-2 grid grid-cols-3">
              <dt class="w-full col-span-3">
                <div class="text-sm font-medium text-gray-400 uppercase">Type of Store</div>
              </dt>
              <dd class="w-full col-span-1" v-for="(label, key) in shopTypes" :key="key">
                <div class="flex items-start">
                  <div class="absolute flex items-center h-5">
                    <input v-model="shopTypeTerms" :value="key" :id="key" type="checkbox" class="form-checkbox w-4 h-4 text-blue-600 transition duration-150 ease-in-out" />
                  </div>
                  <div class="pl-7 text-sm leading-5">
                    <label :for="key" class="text-gray-600">{{ label }}</label>
                  </div>
                </div>
              </dd>
            </div>
            <!-- <div class="owl:mt-2 grid grid-cols-3">
              <dt class="w-full col-span-3">
                <div class="text-sm font-medium text-gray-400 uppercase">Products</div>
              </dt>
              <dd class="w-full col-span-1" v-for="(item, index) in items" :key="index">
                <div class="flex items-start">
                  <div class="absolute flex items-center h-5">
                    <input :id="$options.filters.camel(item)" type="checkbox" class="form-checkbox w-4 h-4 text-blue-600 transition duration-150 ease-in-out" checked />
                  </div>
                  <div class="pl-7 text-sm leading-5">
                    <label :for="$options.filters.camel(item)" class="text-gray-600">{{ item }}</label>
                  </div>
                </div>
              </dd>
            </div> -->
          </dl>
        </div>
      </header>
      <div v-if="loading" class="m-auto text-center">Loading…</div>
      <div v-else class="owl:mt-5">
        <ShopCard :key="shop.id" v-for="shop in shops" :id="String(shop.id)" :shop="shop" @flyTo="$refs.map.flyTo($event)" />
      </div>
    </div>

    <div class="aspect-ratio-16/9 md:aspect-ratio-none relative sticky top-0 w-full max-h-screen">
      <div class="md:static absolute inset-0 w-full h-full">
        <ShopMap v-if="userLocation" ref="map" :shops="shops" :center="userLocation" @move="$emit('changeCenter', $event)" />
      </div>
    </div>

  </div>
</template>

<script>
import { FilterIcon } from 'vue-feather-icons'

import BaseButton from '~/components/base/BaseButton'
import ShopCard from '~/components/ShopCard'
import ShopMap from '~/components/ShopMap'

export default {
  name: 'ShopFilters',
  components: {
    FilterIcon,
    BaseButton,
    ShopCard,
    ShopMap,
  },
  props: [
    'shops',
    'loading',
    'userLocation',
  ],
  data () {
    return {
      showFilters: false,
      shopTypeTerms: [ 'food_and_drink_stores', 'medical' ],
      shopTypes: {
        food_and_drink_stores: 'Food Stores',
        medical: 'Pharmacies',
      },
      // itemTerms: [],
      // items: [
      //   'Toilet Paper', 'Hand Sanitiser', 'Fruit', 'Vegetables',
      //   'Rice', 'Pasta', 'Bread', 'Flour', 'Yeast', 'Cleaning Products',
      // ],
    }
  },
  watch: {
    shopTypeTerms: function () {
      this.$emit('updateTerms', this.shopTypeTerms)
    },
    // itemTerms: function () {
    //   this.$emit('updateTerms', itemTerms)
    // },
  },
}
</script>

<style lang="postcss" scoped>
  header,
  .max-h-screen {
    top: 56px;
    @screen md { top: 64px; }
  }

  .max-h-screen {
    max-height: calc(100vh - 56px);
    @screen md { max-height: calc(100vh - 64px); }
  }
</style>
