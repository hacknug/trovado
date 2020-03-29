<template>
  <div class="lg:ml-6 lg:justify-end flex items-center justify-center flex-1 px-2">
    <div class="lg:max-w-xs w-full max-w-lg">

      <label for="search" class="sr-only">Search</label>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          id="search"
          v-model="searchTerm"
          type="search"
          placeholder="Looking for an item?"
          class="focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md"
          :class="[searchResults.length && 'rounded-b-none']"
        />
        <div v-if="searchTerm" class="absolute inset-y-0 right-0 flex items-center pr-3">
          <button @click="searchTerm = ''" class="hover:text-gray-700 focus:outline-none focus:shadow-outline-blue flex items-center justify-center w-5 h-5 p-1 -m-1 text-xs text-gray-500 bg-gray-100 rounded-full">✕</button>
        </div>
        <dl v-if="searchResults.length" class="top-full sm:text-sm absolute inset-x-0 text-sm leading-4">
          <div class="rounded-b-md py-1 -mt-px bg-white border border-gray-300">
            <dt class="sr-only">Results</dt>
            <div class="owl:border-t">
              <dd v-for="result in searchResults" :key="result.id" class="block border-gray-100">
                <g-link :to="result.path" class="owl:ml-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex block px-3 py-2 text-gray-700 transition duration-150 ease-in-out">
                  <span class="text-blue-600 uppercase">{{ result.p }}</span>
                  <span class="lowercase">{{ result.dr }} ({{ result.lc }})</span>
                </g-link>
              </dd>
            </div>
          </div>
        </dl>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteNavigationSearch',
  data: () => ({
    searchTerm: '',
  }),
  computed: {
    searchResults () {
      return this.searchTerm.length < 3 ? []
        : this.$search.search({ query: this.searchTerm, limit: 5 })
    },
  },
}
</script>
