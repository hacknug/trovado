<template>
  <nav class="bg-white shadow-sm">

    <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
      <div class="flex justify-between h-16">

        <div class="flex">
          <div class="flex items-center flex-shrink-0">
            <g-link class="owl:ml-3 inline-flex items-center text-xl font-black text-blue-600" to="/">{{ siteName }}</g-link>
          </div>
          <div data-nav="desktop" class="sm:ml-12 sm:flex owl:ml-8 hidden">
            <g-link :key="route" v-for="(label, route) in main" :class="className.nav.desktop" :to="route">{{ label }}</g-link>
          </div>
        </div>

        <div class="lg:ml-6 flex items-center justify-end flex-1 px-2">
          <!-- <SiteNavigationSearch /> -->
          <SiteNavigationLang />
        </div>
        <SiteNavigationUser />

        <div class="sm:hidden flex items-center -mr-2">
          <button @click="open = !open" class="hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md" :aria-label="open ? 'Close main menu' : 'Main menu'" :aria-expanded="open">
            <MenuIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- TODO: Add links and localizations -->
    <div :class="{ 'block': open, 'hidden': !open }" class="sm:hidden">

      <div data-nav="mobile" class="owl:mt-1 pt-2 pb-3">
        <g-link :key="route" v-for="(label, route) in main" :class="className.nav.mobile" :to="route">{{ label }}</g-link>
      </div>

      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div class="mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          <a href="#" class="hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 block px-4 py-2 text-base font-medium text-gray-500 transition duration-150 ease-in-out" role="menuitem">Your Profile</a>
          <a href="#" class="hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 block px-4 py-2 mt-1 text-base font-medium text-gray-500 transition duration-150 ease-in-out" role="menuitem">Settings</a>
          <a href="#" class="hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 block px-4 py-2 mt-1 text-base font-medium text-gray-500 transition duration-150 ease-in-out" role="menuitem">Sign out</a>
        </div>
      </div>

    </div>

  </nav>
</template>

<script>
import { SearchIcon, MenuIcon } from 'vue-feather-icons'

// import SiteNavigationSearch from '~/components/site/SiteNavigationSearch'
import SiteNavigationLang from '~/components/site/SiteNavigationLang'
import SiteNavigationUser from '~/components/site/SiteNavigationUser'

export default {
  name: 'SiteNavigation',
  components: {
    SearchIcon, MenuIcon,
    // SiteNavigationSearch,
    SiteNavigationLang,
    SiteNavigationUser,
  },
  props: {
    siteName: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      open: false,
      main: {
        // '/': 'Home',
        '/shops': 'Shops',
        // '/all-shops': 'All Shops',
        '/about/': 'About',
      },
    }
  },
  computed: {
    className () {
      return {
        nav: {
          mobile: 'hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 block py-2 pl-3 pr-4 mt-1 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent',
          desktop: 'focus:outline-none hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent',
        },
      }
    },
  },
}
</script>

<style>
  [data-nav] {
    &[data-nav="mobile"] a.active {
      @apply text-blue-700 bg-blue-50 border-blue-500;
      &:matches(:hover, :focus) { @apply text-blue-800 bg-blue-100 border-blue-700; }
    }
    &[data-nav="desktop"] a.active {
      @apply text-gray-900 border-blue-500;
      &:matches(:hover, :focus) { @apply border-blue-700; }
    }
  }
</style>
