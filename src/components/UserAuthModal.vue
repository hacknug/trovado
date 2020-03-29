<template>
  <portal to="modal" v-if="isVisible">
    <BaseModal @close="$emit('close')" @prev="$emit('prev')" @next="$emit('next')">
      <BaseCard class="w-full max-w-md">

        <template slot="title">{{ form === 'Sign In' ? 'Sign in to your account' : form === 'Sign Up' ? 'Sign up for an account' : form }}</template>
        <template slot="description">
          {{ changeForm.description }}
          <button
            type="button"
            class="hover:text-green-500 focus:outline-none focus:underline font-medium text-green-600 transition duration-150 ease-in-out"
            @click="$emit('changeForm', changeForm)"
            >{{ changeForm.title }}</button>
        </template>

        <UserAuthForm
          :user="user"
          :event="form"
          @changeForm="$emit('changeForm', $event)"
          @signUp="signUpWithEmail($event)"
          @signIn="signInWithEmail($event)"
          @signOut="signOut"
          @resetPassword="resetPassword($event)"
          @deleteAccount="deleteAccount($event)"
        />

      </BaseCard>
    </BaseModal>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { alert } from '~/mixins/Alert'

import BaseCard from '~/components/base/BaseCard'
import BaseModal from '~/components/base/BaseModal'
import UserAuthForm from '~/components/UserAuthForm'

export default {
  name: 'UserAuthModal',
  mixins: [alert],
  components: { BaseCard, BaseModal, UserAuthForm },
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
