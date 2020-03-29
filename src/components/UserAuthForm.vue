<template>
  <BaseForm @submit.native.prevent="$emit($options.filters.camel(event), userDetails)" class="relative">

    <BaseFormFieldset>

      <BaseFormControl class="w-full" label="Email">
        <BaseInput ref="email" v-model="userDetails.email" type="email" autocomplete="email" :isDisabled="!!user" />
      </BaseFormControl>

      <BaseFormControl tag="div" class="w-full" label="Password">
        <BaseInput v-model="userDetails.password" type="password" :autocomplete="event === 'Sign Up' ? 'new-password' : 'current-password'" />
        <BaseInput v-if="event === 'Sign Up'" v-model="userDetails.passwordConfirm" type="password" autocomplete="new-password" placeholder="Confirm Your Password" />
      </BaseFormControl>

      <div class="flex items-center justify-between mt-6">
        <div class="flex items-center">
          <input id="remember_me" type="checkbox" class="form-checkbox w-4 h-4 text-green-600 transition duration-150 ease-in-out" checked />
          <label for="remember_me" class="block ml-2 text-sm leading-5 text-gray-900">Remember me</label>
        </div>

        <div v-if="event === 'Sign In'" class="text-sm leading-5">
          <button class="hover:text-green-500 focus:outline-none focus:underline font-medium text-green-600 transition duration-150 ease-in-out" type="button" @click="$emit('resetPassword', userDetails)">Forgot your password?</button>
        </div>
      </div>

    </BaseFormFieldset>

    <template slot="submit">
      <BaseButton class="w-full" type="submit">Submit</BaseButton>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm leading-5">
          <span class="px-2 text-gray-500 bg-white">
            Or continue with
          </span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 mt-6 opacity-50 cursor-not-allowed">
        <div>
          <span class="inline-flex w-full rounded-md shadow-sm">
            <button type="button" class="hover:text-gray-400 focus:outline-none focus:border-green-300 focus:shadow-outline-green inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md" :class="`pointer-events-none`" disabled>
              <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
        </div>

        <div>
          <span class="inline-flex w-full rounded-md shadow-sm">
            <button type="button" class="hover:text-gray-400 focus:outline-none focus:border-green-300 focus:shadow-outline-green inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md" :class="`pointer-events-none`" disabled>
              <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </button>
          </span>
        </div>

        <div>
          <span class="inline-flex w-full rounded-md shadow-sm">
            <button type="button" class="hover:text-gray-400 focus:outline-none focus:border-green-300 focus:shadow-outline-green inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md" :class="`pointer-events-none`" disabled>
              <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
        </div>
      </div>

    </template>

  </BaseForm>
</template>

<script>
import BaseForm from '~/components/base/BaseForm'
import BaseFormFieldset from '~/components/base/BaseFormFieldset'
import BaseFormControl from '~/components/base/BaseFormControl'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'UserAuthForm',
  components: {
    BaseForm,
    BaseFormFieldset,
    BaseFormControl,
    BaseInput,
    BaseButton,
  },
  props: {
    user: {
      validator: (prop) => typeof prop === 'object' || prop === null,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      userDetails: {
        email: this.user?.email,
        password: null,
        passwordConfirm: null,
      },
    }
  },
  computed: {
    changeForm () {
      return this.event === 'Sign In' ? {
        title: 'Sign Up',
        description: 'Don\'t have an account yet?',
      } : {
        title: 'Sign In',
        description: 'Already have an account?',
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.email.$el.focus()
    })
  },
}
</script>
