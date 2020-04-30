import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

const { auth, db, emailAuthProvider } = process.isClient ? require('~/firebase') : import('~/firebase')

const store = new Vuex.Store({
  state: {
    user: auth?.currentUser,
    userData: {},
    userDataInit: false,
    userLocation: [],
    authIntent: '',
  },

  getters: {
    userDoc: ({ user }) => user && db.collection('users').doc(user.uid),
    userAlias: ({ user, userData }) => userData?.userDetails?.displayName || user?.email,
    userFavourites: ({ userData }) => userData && userData.favourites || {},
    // userPhotoURL: ({ userData }) => userData?.userDetails?.photoURL,
    // userBadgeURL: (state, { userFeaturedParts: { badges } }) => badges?.attachments?.[0]?.url || badges?.gameBadge[0]?.url,
    userAvatar: (state, { userPhotoURL, userBadgeURL }) => userBadgeURL || userPhotoURL,
  },

  mutations: {
    ...vuexfireMutations,

    initialiseStore (state) {
      const localState = localStorage.getItem('store')
      localState && this.replaceState(Object.assign(state, JSON.parse(localState)))
    },

    SET_USER (state, user) {
      state.user = user
    },
    SET_USER_LOCATION (state, location) {
      state.userLocation = location
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

    GET_USER_LOCATION ({ commit }) {
      const makeLngLat = ({ latitude: lat, longitude: lng }) => [lng, lat]
      // navigator.permissions.query({ name: 'geolocation' })
      //   .then((status) => console.info(status))
      return navigator.geolocation.getCurrentPosition(
        (position) => commit('SET_USER_LOCATION', makeLngLat(position.coords)),
        (error) => console.error(error),
        { enableHighAccuracy: true },
      )
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

    async UPDATE_USER_FAVOURITES ({ state, dispatch }, shop) {
      return dispatch('UPDATE_USER_DOC', {
        ...state.userData,
        favourites: [...(state.userData ? state.userData.favourites : []), shop],
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

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
