<template>
  <div class="flex flex-col self-start overflow-hidden rounded-lg shadow-lg">

    <div class="sm:flex-row flex flex-col items-start justify-between flex-1 p-6 bg-white">
      <div class="relative flex-1">
        <p class="text-sm font-medium leading-5 text-blue-600">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 lowercase">Mercadona</span>
        </p>
        <span :to="shop.path" class="block mt-2">
          <h3 class="text-xl font-semibold leading-7 text-gray-900 lowercase truncate">{{ shop.address }}</h3>
          <p class="mt-1 text-base leading-6 text-gray-500 lowercase truncate">{{ `${ shop.zipcode } ${ shop.state } (${ shop.province })` }}</p>
        </span>

        <div class="flex items-end justify-between w-full mt-4">
          <dl>
            <div class="owl:ml-2 flex justify-between">
              <dt class="owl:ml-1 flex items-center text-gray-400">
                <BarChart2Icon class="w-5 h-5" />
                <span>Stock Levels:</span>
              </dt>
              <dd class="font-medium text-green-500">
                <button
                  @click="open = !open"
                  class="owl:ml-0.5 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800 focus:outline-none focus:shadow-outline-blue"
                  aria-label="See Details"
                  ><span>High</span>
                  <ChevronDownIcon class="w-5 h-5" />
                </button>
              </dd>
            </div>
          </dl>
          <BaseButton variant="primary" size="sm">
            <template slot="icon"><CalendarIcon class="w-5 h-5 stroke-current" /></template> Save your Timeslot
          </BaseButton>
          <BaseButton variant="secondary" size="xs" class="absolute top-0 right-0">
            <template slot="icon"><BookmarkIcon class="w-4 h-4 stroke-current" /></template> Add to Favorites
          </BaseButton>
        </div>
      </div>

    </div>

    <div v-if="open" class="bg-gray-50 sm:px-6 owl:mt-8 flex flex-col items-center justify-between px-4 py-6 border-t-2 border-gray-100">

      <div class="mr-auto">
        <dl class="grid grid-cols-2 row-gap-2 col-gap-12">
          <div class="owl:ml-2 flex justify-between" v-for="([label, className], index) in stock" :key="index">
            <dt class="owl:ml-1 flex items-center text-gray-500">{{ items[index] }}:</dt>
            <dd :class="className" class="font-medium">{{ label }}</dd>
          </div>
        </dl>
        <p class="mt-6 text-gray-400">
          <small>Updated 30 minutes ago by
            <a href="#" class="px-1.5 py-1 text-gray-500 bg-gray-100 hover:text-gray-600 focus:bg-text-600 rounded">
              <code class="font-mono">concerned_citizen</code>
            </a>
          </small>
        </p>
      </div>

      <div class="owl:mt-2 text-center">
        <span class="text-sm text-blue-500">Have you been here recently?</span>
        <span class="sm:w-auto flex w-full rounded-md shadow-sm opacity-50 cursor-not-allowed">
          <button disabled @click="open = false; setTimeout(() => open = true, 1000)" type="button" class="group hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5 relative inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm pointer-events-none">
            Update Stock
            <span v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
              <svg class="w-5 h-5 mr-2 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 6V10" />
                <path d="M12 14H12.01" />
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" />
              </svg>
            </span>
          </button>
        </span>
      </div>

      <!-- <div class="sm:flex sm:flex-row-reverse">
        <span class="sm:ml-3 sm:w-auto flex w-full rounded-md shadow-sm">
          <button @click="open = false; setTimeout(() => open = true, 1000)" type="button" class="hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5 inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm">
            Deactivate
          </button>
        </span>

        <span class="sm:mt-0 sm:w-auto flex w-full mt-3 rounded-md shadow-sm">
          <button @click="open = false; setTimeout(() => open = true, 1000)" type="button" class="hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5 inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm">
            Cancel
          </button>
        </span>
      </div> -->

    </div>

  </div>
</template>

<script>
import { BarChart2Icon, BookmarkIcon, CalendarIcon, ChevronDownIcon } from 'vue-feather-icons'

import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ShopCardAlt',
  components: {
    BarChart2Icon,
    BookmarkIcon,
    CalendarIcon,
    ChevronDownIcon,
    BaseButton,
  },
  props: {
    shop: {
      type: Object,
      required: true,
      stock: [],
    },
  },
  data () {
    return {
      open: false,
      icon: true,
      items: ['Toilet Paper', 'Pasta', 'Yeast', 'Bread', 'Rice', 'Flour', 'Hand Sanitiser', 'Cleaning Products'],
      recipe: [
        ['+30 qty', 'text-green-400'],
        ['10-30 qty', 'text-yellow-400'],
        ['1-10 qty', 'text-red-400'],
        ['sold out', 'text-gray-400'],
        ['no info', 'text-black-400'],
      ],
    }
  },
  mounted () {
    this.stock = this.items.map(() => {
      return this.recipe[Math.floor(Math.random() * this.recipe.length)]
    })
  }
}
</script>
