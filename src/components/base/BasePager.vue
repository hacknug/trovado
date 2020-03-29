<template>
  <div class="sm:px-0 px-4 border-t border-gray-200">

    <div class="max-w-7xl flex items-center justify-between mx-auto">

      <div class="flex flex-1 w-0">
        <a :href="pageInfo.currentPage - 1" :class="[...className, 'pr-1']">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          Previous
        </a>
      </div>

      <div class="md:flex hidden">
        <Pager
          :info="pageInfo"
          :showLinks="true"
          :showNavigation="false"
          :linkClass="[...className, 'px-4'].join(' ')"
        />
      </div>

      <div class="flex justify-end flex-1 w-0">
        <a :href="pageInfo.currentPage + 1" :class="[...className, 'pl-1']">
          Next
          <svg class="w-5 h-5 ml-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </a>
      </div>

    </div>

  </div>
</template>

<script>
import { Pager } from 'gridsome'

export default {
  name: 'BasePager',
  components: { Pager },
  props: {
    pageInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    className () {
      return [
        'inline-flex items-center -mt-px pt-4',
        'text-gray-500 hover:text-gray-700 focus:text-gray-700 text-sm leading-5 font-medium',
        'border-t-2 border-transparent hover:border-gray-300 focus:border-gray-400',
        'transition duration-150 ease-in-out',
        'focus:outline-none',
      ]
    },
  },
}
</script>

<style lang="postcss" scoped>
  a.active--exact {
    @apply text-green-600 border-green-500;
    &:matches(:focus) { @apply outline-none text-green-800 border-green-700; }
  }
</style>
