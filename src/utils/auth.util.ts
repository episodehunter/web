import firebase from 'firebase/app'
import 'firebase/auth'
import { Observable, Observer } from 'rxjs'
import { firebaseAuthConfig } from '../config'

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
