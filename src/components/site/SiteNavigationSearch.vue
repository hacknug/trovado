<template>
  <div v-click-outside="hide" class="lg:max-w-xs relative w-full max-w-lg">
    <label for="search" class="sr-only">Search</label>

    <BaseInput
      id="search"
      ref="search"
      autocomplete="off"
      v-model="searchTerm"
      type="search"
      placeholder="Looking for an item?"
      :class="[isFocused && searchResults.length && 'rounded-b-none']"
      @clear="searchResults = []"
      @focus="show"
    >
      <template #icon><SearchIcon class="text-current w-5 h-5" /></template>
    </BaseInput>

    <dl v-if="isFocused && searchResults.length" class="top-full sm:text-sm absolute inset-x-0 text-sm leading-4">
      <div class="rounded-b-md py-1 -mt-px bg-white border border-gray-300">
        <dt class="sr-only">Results</dt>
        <div class="owl:border-t">
          <dd v-for="result in searchResults" :key="result.id" class="block border-gray-100">
            <g-link @click.native="hide" :to="`/shops?q=${result.center.join(',')}`" class="owl:ml-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex block px-3 py-2 text-gray-700 transition duration-150 ease-in-out">
              <span class="flex-none w-5 h-5 font-mono text-blue-600 uppercase">{{ lastContext.short_code }}</span>
              <span class="w-full">{{ result.place_name }})</span>
            </g-link>
          </dd>
        </div>
      </div>
    </dl>

  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { SearchIcon } from 'vue-feather-icons'

import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'SiteNavigationSearch',
  directives: { ClickOutside },
  components: { SearchIcon, BaseInput },
  data: () => ({
    isFocused: false,
    searchTerm: '',
    searchResults: [],
  }),
  computed: {
    lastContext () {
      return this.filteredShops && this.result.context.length ? this.result.context[this.result.context.length - 1] : {}
    },
  },
  methods: {
    show () {
      this.isFocused = true
    },
    hide () {
      this.isFocused = false
    },
    fetchResults () {
      if (this.searchTerm.length > 2) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchTerm}.json?access_token=${process.env.GRIDSOME_MAPBOX_TOKEN}`)
          .then((res) => res.json())
          .then((res) => this.searchResults = res.features)
      }
    },
  },
  watch: {
    searchTerm: 'fetchResults',
  },
  mounted () {
    this.popupItem = this.$el // re: `ClickOutside`
  },
}
</script>
