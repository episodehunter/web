import firebaseApp from 'firebase/app'
import 'firebase/auth'

export const createAuth = (firebase: typeof firebaseApp) => {
  const auth = {
    async signOut() {
      await firebase.auth().signOut()
      window.location.reload()
    },

    login(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    register(email: string, password: string) {
      return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    },

    reauthenticate(password: string) {
      const user = auth.getUser()
      if (!user) {
        throw new Error('User unknown')
      } else if (!user.email) {
        throw new Error('User email unknown')
      }
      return user.reauthenticateAndRetrieveDataWithCredential(
        firebase.auth.EmailAuthProvider.credential(user.email, password)
      )
    },

    changePassword(password: string) {
      const user = auth.getUser()
      if (!user) {
        throw new Error('User unknown')
      }
      return user.updatePassword(password)
    },

    changeEmail(email: string) {
      const user = auth.getUser()
      if (!user) {
        throw new Error('User unknown')
      }
      return user.updateEmail(email)
    },

    getUser() {
      return firebase.auth().currentUser
    },

    getUsername() {
      const user = auth.getUser()
      if (!user) {
        throw new Error('User unknown')
      }
      return user.displayName || ''
    },

    isSigndInUser() {
      return Boolean(auth.getUser())
    },

    getUserId() {
      const user = auth.getUser()
      if (!user) {
        throw new Error('User unknown')
      }
      return user.uid
    },

    getIdToken() {
      const user = auth.getUser()
      if (user) {
        return user.getIdToken(/* forceRefresh */ false)
      }
      return Promise.reject(new Error('User not signed in'))
    },
    authStateChange$(
      next: (user: firebase.User | null) => void,
      error: (error: firebase.auth.Error) => void
    ) {
      return firebase.auth().onAuthStateChanged(next, error)
    }
  }
  return auth
}

export type Auth = ReturnType<typeof createAuth>
