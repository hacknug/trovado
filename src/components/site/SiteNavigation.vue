<template>
  <nav class="bg-white shadow-sm">

    <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
      <div class="flex justify-between h-16">

        <div class="flex">
          <div class="flex items-center flex-shrink-0">
            <g-link class="owl:ml-3 inline-flex items-center" to="/">
              <svg class="block w-auto h-8" viewBox="0 0 30 53" fill="none" stroke="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.89311 33.9692L2.76882 33.6512H2.42743H1.14703C0.757318 33.6512 0.5 33.3666 0.5 33.0722L0.5 1.07899C0.5 0.789089 0.768841 0.5 1.14703 0.5L3.25435 0.5H3.38806L3.42642 0.602219L3.42636 0.602242L3.42932 0.609771C5.76197 6.53365 7.80877 10.8752 9.66763 13.6525C10.5978 15.0423 11.4937 16.0521 12.3453 16.6862C13.2002 17.3228 13.9968 17.5984 14.8156 17.5366C15.63 17.475 16.4683 17.0447 17.3147 16.3111C18.1651 15.574 19.0615 14.4985 19.9975 13.0715C21.865 10.2247 23.9084 6.00709 26.2508 0.606464L26.3003 0.5H26.4349L28.6756 0.5C29.0538 0.5 29.3227 0.789081 29.3227 1.07899V33.0722C29.3227 33.3666 29.0653 33.6512 28.6756 33.6512H27.3152H26.9863L26.8561 33.9533C24.4814 39.4606 22.4272 43.7799 20.5191 46.7538C18.5317 49.8512 16.7848 51.4921 14.8717 51.6443C13.9374 51.7186 12.9721 51.3769 12.0402 50.6662C11.1024 49.951 10.1719 48.871 9.19446 47.3774C7.28997 44.4669 5.25471 40.0104 2.89311 33.9692Z" fill="#FBD9E2" />
                <path d="M13.3732 41.2549H16.3702V44.0741H19.3672L14.8717 49.7126L10.3762 44.0741H13.3732V41.2549Z" fill="black" />
              </svg>
              <!-- <span class="sm:block hidden font-bold">{{ siteName }}</span> -->
            </g-link>
          </div>
          <div class="sm:ml-6 sm:flex owl:ml-8 hidden">
            <g-link :key="route"
              v-for="(label, route) in main"
              class="focus:outline-none hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent"
              :to="route"
              >{{ label }}</g-link>
          </div>
        </div>

        <SiteNavigationSearch />
        <!-- <SiteNavigationLang /> -->
        <SiteNavigationUser />

        <div class="sm:hidden flex items-center -mr-2">
          <button @click="open = !open" class="hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md" :aria-label="open ? 'Close main menu' : 'Main menu'" :aria-expanded="open">
            <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path :class="{ 'hidden': open, 'inline-flex': !open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path :class="{ 'hidden': !open, 'inline-flex': open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- TODO: Add links and localizations -->
    <div :class="{ 'block': open, 'hidden': !open }" class="sm:hidden">
      <div class="pt-2 pb-3">
        <a href="#" class="bg-green-50 focus:outline-none focus:text-green-800 focus:bg-green-100 focus:border-green-700 block py-2 pl-3 pr-4 text-base font-medium text-green-700 transition duration-150 ease-in-out border-l-4 border-green-500">Dashboard</a>
        <a href="#" class="hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 block py-2 pl-3 pr-4 mt-1 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent">Team</a>
        <a href="#" class="hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 block py-2 pl-3 pr-4 mt-1 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent">Projects</a>
        <a href="#" class="hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 block py-2 pl-3 pr-4 mt-1 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent">Calendar</a>
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
import SiteNavigationSearch from '~/components/site/SiteNavigationSearch'
import SiteNavigationLang from '~/components/site/SiteNavigationLang'
import SiteNavigationUser from '~/components/site/SiteNavigationUser'

export default {
  name: 'SiteNavigation',
  components: {
    SiteNavigationSearch,
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
        '/': 'Home',
        '/shops': 'Shops',
        '/all-shops': 'All Shops',
        // '/about/': 'About',
      },
    }
  },
}
</script>

<style>
  a.active--exact {
    @apply text-gray-900 border-green-500;
    &:matches(:hover, :focus) { @apply border-green-700; }
  }
</style>
