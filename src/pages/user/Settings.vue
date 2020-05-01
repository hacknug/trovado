<template>
  <Layout>
    <BaseSection>
      <ul class="sm:grid-cols-2 lg:gap-16 grid w-full max-w-4xl gap-8 mx-auto">

        <li class="owl:mt-4">
          <BaseSectionHeader title="Change Email"/>
          <BaseForm class="relative max-w-full" @submit.native.prevent="changeEmail(userDetails)">
            <BaseFormFieldset>
              <BaseFormControl class="w-full" label="Current Email">
                <BaseInput :value="user && user.email" type="email" :isDisabled="true" />
              </BaseFormControl>
              <BaseFormControl class="w-full" label="New Email">
                <BaseInput v-model="userDetails.newEmail" type="email" />
              </BaseFormControl>
            </BaseFormFieldset>
            <template slot="submit">
              <BaseButton class="w-full" type="submit">Update Email</BaseButton>
            </template>
          </BaseForm>
        </li>

        <li class="owl:mt-4">
          <BaseSectionHeader title="Change Password"/>
          <BaseForm class="relative max-w-full" @submit.native.prevent="changePassword(userDetails)">
            <BaseFormFieldset>
              <!-- <BaseFormControl class="w-full" label="Current Password">
                <BaseInput v-model="userDetails.password" type="password" />
              </BaseFormControl> -->
              <BaseFormControl tag="div" class="w-full" label="New Password">
                <BaseInput v-model="userDetails.newPassword" type="password" />
                <BaseInput v-model="userDetails.newPasswordConfirm" type="password" placeholder="Confirm Password" />
              </BaseFormControl>
            </BaseFormFieldset>
            <template slot="submit">
              <BaseButton class="w-full" type="submit">Update Password</BaseButton>
            </template>
          </BaseForm>
        </li>

        <li class="owl:mt-4">
          <BaseSectionHeader title="Verify Email"/>
          <BaseForm class="relative max-w-full" @submit.native.prevent="verifyEmail()">
            <template slot="submit">
              <BaseButton class="w-full" type="submit" :isDisabled="isVerified">
                {{ isVerified ? 'Already Verified' : 'Send Verification Email' }}
              </BaseButton>
            </template>
          </BaseForm>
        </li>

        <li class="owl:mt-4">
          <BaseSectionHeader title="Delete Account"/>
          <BaseForm class="relative max-w-full" @submit.native.prevent="deleteAccount()">
            <p>Careful. There's no way to undo this.</p>
            <template slot="submit">
              <BaseButton class="w-full" type="submit">Delete Account</BaseButton>
            </template>
          </BaseForm>
        </li>

      </ul>

    </BaseSection>
  </Layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import { alert } from '~/mixins/Alert'

import BaseSection from '~/components/base/BaseSection'
import BaseSectionHeader from '~/components/base/BaseSectionHeader'
import BaseForm from '~/components/base/BaseForm'
import BaseFormFieldset from '~/components/base/BaseFormFieldset'
import BaseFormControl from '~/components/base/BaseFormControl'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'

export default {
  mixins: [alert],
  components: {
    BaseSection,
    BaseSectionHeader,
    BaseForm,
    BaseFormFieldset,
    BaseFormControl,
    BaseInput,
    BaseButton,
  },
  metaInfo () {
    return {
      title: this.title,
    }
  },
  data () {
    return {
      title: 'User Settings',
      userDetails: {
        password: null,
        newEmail: null,
        newPassword: null,
        newPasswordConfirm: null,
      },
    }
  },
  computed: {
    ...mapState(['user']),

    isVerified () {
      return this.user?.emailVerified
    },
  },
  methods: {
    ...mapMutations(['SET_AUTH_INTENT']),
    ...mapActions(['UPDATE_PASSWORD', 'UPDATE_EMAIL', 'VERIFY_EMAIL', 'DELETE_ACCOUNT']),

    changeEmail ({ newEmail }) {
      if (newEmail) {
        this.UPDATE_EMAIL(newEmail)
          .then(() => this.alert('yo', 'Email updated'))
          .catch((error) => this.handleUserReAuth(error))
      } else {
        this.alert('no', 'Please, provide an email address')
      }
    },
    changePassword ({ newPassword, newPasswordConfirm }) {
      if (newPassword && newPasswordConfirm) {
        if (newPassword === newPasswordConfirm) {
          this.UPDATE_PASSWORD(newPassword)
            .then(() => this.alert('ok', 'Password updated'))
            .catch((error) => this.handleUserReAuth(error))
        } else {
          this.alert('no', 'Passwords don\'t match, sorry')
        }
      } else {
        this.alert('no', 'Please, fill both fields')
      }
    },
    verifyEmail () {
      if (!this.isVerified) {
        this.VERIFY_EMAIL()
          .then(() => this.alert('yo', 'Email sent'))
          .catch((error) => this.handleUserReAuth(error))
      } else {
        this.alert('ok', 'Email already verified')
      }
    },
    deleteAccount () {
      this.SET_AUTH_INTENT('Delete Account')
    },

    handleUserReAuth (error) {
      if (error.code === 'auth/requires-recent-login') {
        this.alert('yo', 'Please, sign in again')
        this.SET_AUTH_INTENT('Sign In')
      } else {
        this.alert('no', error.message)
      }
    },
  },
}
</script>
