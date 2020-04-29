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
      :class="[isFocused && 'rounded-b-none']"
      @clear="searchResults = []"
      @focus="show"
    >
      <template slot="icon"><SearchIcon class="text-current size-inherit" /></template>
    </BaseInput>

    <dl v-if="isFocused" class="top-full sm:text-sm absolute inset-x-0 z-10 text-base leading-5">
      <div class="last:rounded-b-md py-1 -mt-px bg-white border border-gray-300">
        <dt class="sr-only">Location</dt>
        <div class="owl:border-t">
          <dd class="block border-gray-100">
            <button type="button" @click.prevent="useCurrentLocation" :class="['w-full text-left text-green-600 hover:bg-green-100 focus:bg-gray-100 bg-green-50', className.item]">
              <span :class="[className.icon, className.hook]"><NavigationIcon class="size-inherit fill-current" /></span>
              <span class="w-full font-medium">Use current location</span>
            </button>
          </dd>
        </div>
      </div>
      <div v-if="this.searchTerm.length > 2 && searchResults.length" class="last:rounded-b-md py-1 -mt-px bg-white border border-gray-300">
        <dt class="sr-only">Results</dt>
        <div class="owl:border-t">
          <dd v-for="result in searchResults" :key="result.id" class="block border-gray-100">
            <g-link @click.native="hide" :to="`/shops?q=${result.center.join(',')}`" :class="className.item">
              <span :class="[className.icon, className.code]">{{ lastContext(result).short_code }}</span>
              <span class="w-full truncate">{{ result.place_name }}</span>
            </g-link>
          </dd>
        </div>
      </div>
    </dl>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClickOutside from 'vue-click-outside'
import { NavigationIcon, SearchIcon } from 'vue-feather-icons'

import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'SiteNavigationSearch',
  directives: { ClickOutside },
  components: { NavigationIcon, SearchIcon, BaseInput },
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
    apiBaseUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  }),
  computed: {
    ...mapState(['userLocation']),

    className () {
      return {
        term: [
          this.size === 'md' && 'text-sm leading-5',
          this.size === 'xl' && 'text-base leading-6',
        ],
        item: [
          this.size === 'md' && 'px-3 owl:ml-2',
          this.size === 'xl' && 'px-5 owl:ml-3',
          'flex items-baseline py-2',
          'text-gray-600 hover:bg-gray-50 focus:bg-gray-50',
          'transition duration-150 ease-in-out focus:outline-none',
        ],
        icon: [
          'flex-none',
        ],
        code: [
          this.size === 'md' && 'w-5',
          this.size === 'xl' && 'w-6',
          'text-gray-400 font-mono text-center uppercase',
        ],
        hook: [
          this.size === 'md' && 'w-4 h-4',
          this.size === 'xl' && 'w-5 h-5',
          'self-center mr-1 text-green-400',
        ],
      }
    },
    apiParams () {
      const locationString = Object.keys(this.userLocation).length
        ? `${this.userLocation.lng},${this.userLocation.lat}`
        : false

      return new URLSearchParams({
        access_token: process.env.GRIDSOME_MAPBOX_TOKEN,
        proximity: locationString,
        limit: 5,
        // language: 'yo',
        // types: 'yo',
      })
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
        fetch(`${this.apiBaseUrl}/${this.searchTerm}.json?${this.apiParams.toString()}`)
          .then((res) => res.json())
          .then((res) => this.searchResults = res.features)
      }
    },
    lastContext (result) {
      return result.context.length ? result.context[result.context.length - 1] : {}
    },
    useCurrentLocation () {
      this.$store.dispatch('GET_USER_LOCATION')
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
