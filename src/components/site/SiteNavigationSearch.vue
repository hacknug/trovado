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
        <input id="search" class="focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md" placeholder="Looking for an item?" />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteNavigationSearch',
}
</script>
