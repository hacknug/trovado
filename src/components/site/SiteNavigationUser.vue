<template>
  <div class="sm:ml-6 sm:flex sm:items-center owl:ml-3 hidden">

    <div v-if="!user" class="owl:ml-2">
      <BaseButton variant="secondary" @click.native="SET_AUTH_INTENT('Sign In')">Sign In</BaseButton>
      <BaseButton variant="primary" @click.native="SET_AUTH_INTENT('Sign Up')">Sign Up</BaseButton>
    </div>

    <div v-else class="flex items-center">

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
        <transition v-bind="transitions.zoom">
          <div v-show="open" class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
            <div class="py-1 bg-white rounded-md shadow-xs">
              <button @click="setIntent('Favourites')" :class="className">Favourites</button>
              <g-link :to="$tp && $tp('/user/settings/')" :class="className">Settings</g-link>
              <button @click="signOut" :class="className">Sign Out</button>
            </div>
          </div>
        </transition>
      </div>

    </div>

    <ClientOnly>
      <UserAuthModal
        :form="authIntent"
        :isVisible="!!authIntent"
        @changeForm="SET_AUTH_INTENT($event.title)"
        @close="SET_AUTH_INTENT('')"
      />
    </ClientOnly>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { alert } from '~/mixins/Alert'
import { transitions } from '~/mixins/Transitions'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'SiteNavigationUser',
  mixins: [alert, transitions],
  components: {
    BaseButton,
    UserAuthModal: () => import('~/components/UserAuthModal'),
  },
  data () {
    return {
      open: false,
      main: {
        favourites: 'Favourites',
        settings: 'Settings',
        // signOut: 'Sign Out',
      },
    }
  },
  computed: {
    ...mapState(['user', 'authIntent']),
    ...mapGetters(['userAlias', 'userAvatar']),

    className () {
      return [
        'block w-full px-4 py-2',
        'text-gray-700 hover:bg-gray-100 focus:bg-gray-100',
        'text-sm leading-5 text-left focus:outline-none',
        'transition duration-150 ease-in-out',
      ]
    },
  },
  methods: {
    ...mapMutations(['SET_AUTH_INTENT']),
    ...mapActions(['SIGN_OUT']),

    setIntent (intent) {
      this.open = false
      this.SET_AUTH_INTENT(intent)
    },
    signOut () {
      this.open = false
      this.SIGN_OUT()
        .then(() => this.alert('yo', 'See you soon'))
        .then(() => this.$route.path.includes('/user/') && this.$router.push('/'))
        .catch((error) => this.alert('no', error))
    },
  },
}
</script>
