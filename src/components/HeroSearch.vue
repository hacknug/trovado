<template>
  <div class="relative flex overflow-hidden" style="min-height: 50vh;">
    <div class="hidden lg:block lg:absolute lg:inset-0">
      <span class="absolute top-0 transform translate-x-64 -translate-y-8 left-1/2">
        <svg class="" width="640" height="784" fill="none" viewBox="0 0 640 784">
          <defs>
            <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>
        <figure class="absolute inset-0 flex items-center w-full h-full transform -translate-x-1/4">
          <ShoppingCart class="w-full" />
        </figure>
      </span>
    </div>

    <BaseContainer class="w-full h-full py-12 my-auto md:py-16 lg:py-20">
      <div class="z-0 mb-8 lg:hidden">
          <figure class="transform translate-x-1/4 translate-y-1/12">
            <ShoppingCart class="w-auto -mt-20 h-72" />
          </figure>
      </div>

      <div class="relative z-10 flex flex-col justify-center lg:w-1/2 lg:h-full">

        <ClientOnly>
          <h2 class="flex flex-col text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10">
            <span class="text-gray-900">Need <vue-typer :text="items" :shuffle="true" initialAction="erasing" />?</span>
            <span class="text-blue-600">{{ $t && $t('components.HeroSearch.title')[1] }}</span>
            <!-- <span class="text-blue-600">Optimise your supermarket &amp; pharmacy visit during the COVID-19 quarantine.</span> -->
          </h2>
        </ClientOnly>
        <p class="mt-3 text-lg leading-7 text-gray-500">{{ $t && $t('components.HeroSearch.description') }}</p>

        <form class="flex mt-8 owl:ml-3" @submit.prevent="handleSubmit">
          <SiteNavigationSearch class="sm:max-w-xs" size="xl" placeholder="Enter your ZIP Code" />
          <div class="flex-shrink-0">
            <BaseButton class="shadow" size="xl" type="submit">Search</BaseButton>
          </div>
        </form>

        <transition v-bind="transitions.zoom">
          <div v-show="suggestions.length" class="mt-8">
            <dl class="flex flex-wrap text-sm owl:mt-2 owl:mr-2">
              <dt class="w-full mb-1 text-gray-500">Suggestions</dt>
              <dd v-for="(suggestion, index) in suggestions" :key="index" class="font-medium leading-5">
                <g-link :to="$tp && $tp(`/shops?q=${suggestion}`)"
                  class="focus:outline-none focus:shadow-outline inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800"
                >{{ suggestion }}
                </g-link>
              </dd>
            </dl>
          </div>
        </transition>

      </div>
    </BaseContainer>

  </div>
</template>

<script>
import { SearchIcon } from 'vue-feather-icons'

import { transitions } from '~/mixins/Transitions'
import BaseContainer from '~/components/base/BaseContainer'
import BaseButton from '~/components/base/BaseButton'
import BaseInput from '~/components/base/BaseInput'
import ShoppingCart from '~/components/icon/ShoppingCart'
import SiteNavigationSearch from '~/components/site/SiteNavigationSearch'

export default {
  name: 'HeroSearch',
  mixins: [transitions],
  components: {
    SearchIcon,
    BaseContainer, BaseButton, BaseInput,
    ShoppingCart, SiteNavigationSearch,
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
  },
  data () {
    return {
      searchTerm: '',
      items: ['toilet paper', 'pasta', 'yeast', 'bread', 'rice', 'flour', 'hand sanitiser', 'cleaning products'],
      cities: new Set(),
      positions: new Set(),
      zipcodes: new Set(),
    }
  },
  computed: {
    suggestions () {
      return [ ...this.cities, ...this.zipcodes, ...this.positions ]
    },
  },
  methods: {
    handleSubmit (event) {
      // TODO: Save query in userData
      this.$router.push({
        path: 'shops',
        query: { q: this.searchTerm },
      })
    },
  },
  mounted () {
    fetch('/api/userGeo')
      .then((response) => response.json())
      .then((data) => data.forEach((res) => {
        if (res.city)
          this.cities = new Set(this.cities.add(res.city))
        if (res.postal)
          this.zipcodes = new Set(this.zipcodes.add(res.postal))
        // if (res.longitude && res.latitude)
        //   this.positions = new Set(this.positions.add(`${res.longitude},${res.latitude}`))
      }))
  },
}
</script>
