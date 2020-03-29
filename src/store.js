import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

const { auth, db, emailAuthProvider } = process.isClient ? require('~/firebase') : import('~/firebase')

export default new Vuex.Store({
  state: {
    user: auth?.currentUser,
    userData: {},
    userDataInit: false,
    authIntent: '',
  },

  getters: {
    userDoc: ({ user }) => user && db.collection('users').doc(user.uid),
    userAlias: ({ user, userData }) => userData?.userDetails?.displayName || user?.email,
    // userFeaturedParts: ({ userData }) => userData?.userDetails?.featuredParts || {},
    userPhotoURL: ({ userData }) => userData?.userDetails?.photoURL,
    // userBadgeURL: (state, { userFeaturedParts: { badges } }) => badges?.attachments?.[0]?.url || badges?.gameBadge[0]?.url,
    // userAvatar: (state, { userPhotoURL, userBadgeURL }) => userBadgeURL || userPhotoURL,
  },

  mutations: {
    ...vuexfireMutations,

    SET_USER (state, user) {
      state.user = user
    },
    SET_AUTH_INTENT (state, intent) {
      state.authIntent = intent
    },
    SET_DATA_INIT (state, isInit) {
      state.userDataInit = isInit
    },
  },

  actions: {
    SIGN_UP (context, { email, password }) {
      return auth.createUserWithEmailAndPassword(email, password)
    },
    SIGN_IN ({ state }, { email, password }) {
      return state.user
        ? state.user.reauthenticateWithCredential(emailAuthProvider.credential(email, password))
        : auth.signInWithEmailAndPassword(email, password)
    },
    SIGN_OUT () {
      return auth.signOut()
    },

    RESET_PASSWORD (context, email) {
      return auth.sendPasswordResetEmail(email)
    },
    UPDATE_PASSWORD ({ state }, newPassword) {
      return state.user.updatePassword(newPassword)
    },
    UPDATE_EMAIL ({ state }, newEmail) {
      return state.user.updateEmail(newEmail)
    },
    VERIFY_EMAIL ({ state }) {
      return state.user.sendEmailVerification()
    },
    DELETE_ACCOUNT ({ state }) {
      return state.user.delete()
    },

    async SET_USER_DOC ({ state, getters, dispatch }, doc = {}) {
      // !state.userDataInit && await dispatch('BIND_USER_DATA')
      return getters.userDoc?.set(doc)
    },
    async UPDATE_USER_DOC ({ state, getters, dispatch }, doc = {}) {
      !state.userData && await dispatch('SET_USER_DOC')
      !state.userDataInit && await dispatch('BIND_USER_DATA')
      return getters.userDoc?.update(doc)
    },

    async UPDATE_USER_FEATURED_PARTS ({ state, dispatch }, [type, part]) {
      return dispatch('UPDATE_USER_DOC', {
        ...state.userData,
        userDetails: {
          ...state.userData?.userDetails,
          featuredParts: {
            ...state.userData?.userDetails?.featuredParts,
            [type]: part,
          },
        },
      })
    },

    async BIND_USER ({ commit, dispatch }, user) {
      commit('SET_USER', await user)
      await dispatch('BIND_USER_DATA')
    },

    BIND_USER_DATA: firestoreAction(async ({ state, getters, commit, bindFirestoreRef, unbindFirestoreRef }) => {
      await state.user
        ? bindFirestoreRef('userData', getters.userDoc)
        : unbindFirestoreRef('userData')
      commit('SET_DATA_INIT', !!state.user)
    }),
  },
})
