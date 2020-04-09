<template>
  <portal to="modal" v-if="isVisible">
    <BaseModal @close="$emit('close')" @prev="$emit('prev')" @next="$emit('next')">
      <BaseCard class="w-full" :class="[isAuthForm ? 'max-w-md' : 'max-w-xl']">

        <template slot="title">{{ formTitle }}</template>
        <template slot="description">
          {{ formDescription }}
          <button
            v-if="isAuthForm"
            type="button"
            class="hover:text-blue-500 focus:outline-none focus:underline font-medium text-blue-600 transition duration-150 ease-in-out"
            @click="$emit('changeForm', changeForm)"
            >{{ changeForm.title }}</button>
        </template>

        <UserAuthForm
          v-if="isAuthForm"

          :user="user"
          :event="form"
          @changeForm="$emit('changeForm', $event)"
          @signUp="signUpWithEmail($event)"
          @signIn="signInWithEmail($event)"
          @signOut="signOut"
          @resetPassword="resetPassword($event)"
          @deleteAccount="deleteAccount($event)"
        />

        <div v-else>
          <div class="lg:max-w-none grid max-w-xl gap-5 mx-auto mt-12">
            <ShopCard v-for="node in userFavourites" :key="node.id" :id="String(node.id)" :shop="node" />
          </div>
        </div>

      </BaseCard>
    </BaseModal>
  </portal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { alert } from '~/mixins/Alert'

import BaseCard from '~/components/base/BaseCard'
import BaseModal from '~/components/base/BaseModal'
import UserAuthForm from '~/components/UserAuthForm'
import ShopCard from '~/components/ShopCard'

export default {
  name: 'UserAuthModal',
  mixins: [alert],
  components: { BaseCard, BaseModal, UserAuthForm, ShopCard },
  props: {
    form: {
      type: String,
      required: false,
      default: 'Sign In',
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userFavourites']),

    isAuthForm () {
      return this.form.includes('Sign')
    },

    formTitle () {
      return {
        'Sign In': 'Sign in to your account',
        'Sign Up': 'Sign up for an account',
        'Favourites': 'Your Favourites',
        'Settings': 'Sign up for an account',
      }[this.form] || this.form
    },
    formDescription () {
      return {
        'Favourites': 'Manage and browse your favourite shops',
        'Settings': 'Sign up for an account',
      }[this.form] || this.changeForm.description
    },

    changeForm () {
      return this.form === 'Sign In' ? {
        title: 'Sign Up',
        description: 'Don\'t have an account yet?',
      } : {
        title: 'Sign In',
        description: 'Already have an account?',
      }
    },
  },
  methods: {
    ...mapActions(['SIGN_UP', 'SIGN_IN', 'RESET_PASSWORD', 'DELETE_ACCOUNT']),

    deleteAccount ({ email, password }) {
      if (email && password) {
        this.SIGN_IN({ email, password })
          .then(() => this.DELETE_ACCOUNT())
          .then(() => this.$router.push('/'))
          .then(() => this.toggleForm())
          .then(() => this.alert('yo', 'Account deleted'))
          .catch((error) => this.handleError(error))
      } else {
        this.alert('no', 'Please, enter your password')
      }
    },
    resetPassword ({ email }) {
      this.RESET_PASSWORD(email)
        .then(() => this.toggleForm(true))
        .then(() => this.alert('yo', 'Check your email'))
        .catch((error) => this.handleError(error))
    },
    signInWithEmail ({ email, password }) {
      this.SIGN_IN({ email, password })
        .then(() => this.toggleForm())
        .then(() => this.alert('ok', 'Welcome back'))
        .then(() => this.$emit('close'))
        .catch((error) => this.handleError(error))
    },
    signUpWithEmail ({ email, password, passwordConfirm }) {
      // TODO: Validate `email` and `password`
      if (password && passwordConfirm) {
        if (password === passwordConfirm) {
          this.SIGN_UP({ email, password })
            .then(() => this.toggleForm())
            .then(() => this.alert('ok', 'Welcome'))
            .catch((error) => this.handleError(error))
        } else {
          this.alert('no', 'Passwords don\'t match, sorry')
        }
      } else {
        this.alert('no', 'Please, confirm your password')
      }
    },
    signOut () {
      this.SIGN_OUT()
        .then(() => this.alert('yo', 'See you soon'))
        .catch((error) => this.handleError(error))
    },

    handleError (error) {
      this.alert('no', error.message)
    },
    toggleForm (show = false) {
      !show && this.$emit('close')
    },
  },
}
</script>
