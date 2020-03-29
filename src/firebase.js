import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Get a Firestore instance
firebase.initializeApp(JSON.parse(process.env.GRIDSOME_FIREBASE_CONFIG))

export const db = firebase.firestore()
export const auth = firebase.auth()

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export const emailAuthProvider = firebase.auth.EmailAuthProvider
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
googleAuthProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider)

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })
