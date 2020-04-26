<template>
  <div v-click-outside="hide" class="lg:max-w-xs relative w-full max-w-lg">
    <label for="search" class="sr-only">Search</label>

    <BaseInput
      id="search"
      v-model="searchTerm"
      type="search"
      autocomplete="off"
      :placeholder="placeholder"
      :size="size"
      :class="[isFocused && searchResults.length && 'rounded-b-none']"
      @clear="searchResults = []"
      @focus="show"
    >
      <template slot="icon"><SearchIcon class="text-current size-inherit" /></template>
    </BaseInput>

    <dl v-if="isFocused && searchResults.length" class="top-full sm:text-sm absolute inset-x-0 z-10 text-sm leading-5">
      <div class="rounded-b-md py-1 -mt-px bg-white border border-gray-300">
        <dt class="sr-only">Results</dt>
        <div class="owl:border-t">
          <dd v-for="result in searchResults" :key="result.id" class="block border-gray-100">
            <g-link @click.native="hide" :to="`/shops?q=${result.center.join(',')}`" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-baseline py-2 text-gray-700 transition duration-150 ease-in-out" :class="[size === 'md' && 'px-3 owl:ml-2', size === 'xl' && 'px-5 owl:ml-3']">
              <span :class="[size === 'md' && 'w-5 h-5', size === 'xl' && 'w-6 h-6']" class="flex-none font-mono text-center text-blue-600 uppercase">
                {{ lastContext(result).short_code }}
              </span>
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
  props: {
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Looking for an item?',
    },
  },
  data: () => ({
    isFocused: false,
    searchTerm: '',
    searchResults: [],
  }),
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
    lastContext (result) {
      return result.context.length ? result.context[result.context.length - 1] : {}
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
