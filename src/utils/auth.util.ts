import firebase from 'firebase/app'
import 'firebase/auth'
import { Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { firebaseAuthConfig } from '../config'
import { AuthenticatedState } from '../enum'

// Movie this
firebase.initializeApp(firebaseAuthConfig)

export const getUser = () => firebase.auth().currentUser

export const getIdToken = () => {
  const user = getUser()
  if (user) {
    return user.getIdToken(/* forceRefresh */ false)
  }
  return Promise.reject(new Error('User not signed in'))
}

export const signInWithEmailAndPassword = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signOut = () => firebase.auth().signOut()

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
  map(
    user =>
      user
        ? AuthenticatedState.authenticated
        : AuthenticatedState.notAuthenticated
  )
)

export const reauthenticateUser = async (password: string) => {
  const user = getUser()
  return user!.reauthenticateAndRetrieveDataWithCredential(
    firebase.auth.EmailAuthProvider.credential(user!.email!, password)
  )
}

export const updatePassword = async (password: string) => {
  const user = getUser()
  return user!.updatePassword(password)
}

export const updateEmail = async (email: string) => {
  const user = getUser()
  return user!.updateEmail(email)
}
