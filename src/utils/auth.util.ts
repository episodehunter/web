import firebase from 'firebase/app'
import 'firebase/auth'
import { Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { firebaseAuthConfig } from '../config'
import { AuthenticatedState } from '../enum'

// Movie this
firebase.initializeApp(firebaseAuthConfig)

export const auth = {
  async signOut() {
    await firebase.auth().signOut()
    window.location.reload()
  },

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  register(email: string, password: string) {
    return firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
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
  }
}

export const authStateChange$: Observable<firebase.User> = Observable.create(
  (observer: Observer<firebase.User | null>) => {
    firebase
      .auth()
      .onAuthStateChanged(
        (user: firebase.User | null) => observer.next(user),
        (error: firebase.auth.Error) => observer.error(error),
        () => observer.complete()
      )
  }
)

export const authenticated$: Observable<
  AuthenticatedState
> = authStateChange$.pipe(
  map(user =>
    user
      ? AuthenticatedState.authenticated
      : AuthenticatedState.notAuthenticated
  )
)
