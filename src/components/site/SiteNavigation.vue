<template>
  <nav class="bg-white shadow-sm">

    <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
      <div class="flex justify-between h-16">

        <div class="flex">
          <div class="flex items-center flex-shrink-0">
            <g-link to="/">
              <!-- <img class="lg:hidden block w-auto h-8" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow logo" />
              <img class="lg:block hidden w-auto h-8" src="/img/logos/workflow-logo-on-white.svg" alt="Workflow logo" /> -->
              {{ siteName }}
            </g-link>
          </div>
          <div class="sm:ml-6 sm:flex owl:ml-8 hidden">
            <g-link
              to="/"
              class="focus:outline-none hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent"
              >Home</g-link>
            <g-link
              to="/about/"
              class="focus:outline-none hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent"
              >About</g-link>
          </div>
        </div>

        <div class="sm:ml-6 sm:flex sm:items-center owl:ml-3 hidden">

          <button class="hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 p-1 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full" aria-label="Notifications">
            <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div class="relative">
            <div>
              <button @click="open = !open" class="focus:outline-none focus:border-gray-300 flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full" id="user-menu" aria-label="User menu" aria-haspopup="true" :aria-expanded="open">
                <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div>
            <div
              v-show="open"
              x-transition:enter="transition ease-out duration-200"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
              ><div class="py-1 bg-white rounded-md shadow-xs">
                <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out">Your Profile</a>
                <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out">Settings</a>
                <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out">Sign out</a>
              </div>
            </div>
          </div>

        </div>

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

    <div :class="{ 'block': open, 'hidden': !open }" class="sm:hidden">
      <div class="pt-2 pb-3">
        <a href="#" class="bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 transition duration-150 ease-in-out border-l-4 border-indigo-500">Dashboard</a>
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
export default {
  name: 'SiteNavigation',
  props: {
    siteName: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      open: false,
    }
  },
}
</script>

<style>
  a.active--exact {
    @apply text-gray-900 border-indigo-500;
    &:matches(:hover, :focus) { @apply border-indigo-700; }
  }
</style>
