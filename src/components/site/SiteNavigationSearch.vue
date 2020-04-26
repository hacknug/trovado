<template>
  <div v-click-outside="hide" class="lg:max-w-xs relative w-full max-w-lg">
    <label for="search" class="sr-only">Search</label>

    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <SearchIcon class="w-5 h-5 text-gray-400" />
    </div>

    <input
      id="search"
      ref="search"
      v-model="searchTerm"
      type="search"
      placeholder="Looking for an item?"
      autocomplete="off"
      class="focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md"
      :class="[isFocused && searchResults.length && 'rounded-b-none']"
      @focus="show"
    />

    <div v-if="searchTerm" class="absolute inset-y-0 right-0 flex items-center pr-3">
      <button @click="clearSearch" class="hover:text-gray-700 focus:outline-none focus:shadow-outline-blue flex items-center justify-center w-5 h-5 p-1 -m-1 text-xs leading-none text-gray-500 bg-gray-100 rounded-full">✕</button>
    </div>

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

export default {
  name: 'SiteNavigationSearch',
  components: { SearchIcon },
  directives: { ClickOutside },
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
    clearSearch () {
      this.searchTerm = ''
      this.searchResults = []
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
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
