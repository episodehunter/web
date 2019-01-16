// import { User } from 'firebase'
// import { action, computed, observable } from 'mobx'
// import {
//   authStateChange$,
//   reauthenticateUser,
//   registerWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateEmail,
//   updatePassword
// } from '../utils/auth.util'

// export class UserStore {
//   @observable.ref
//   user: User | null | undefined = undefined

//   constructor() {
//     authStateChange$.subscribe(user => this.setUser(user))
//   }

//   @action
//   setUser(user) {
//     this.user = user
//   }

//   @computed
//   get isAuthenticated() {
//     return Boolean(this.user)
//   }

//   async signOut() {
//     await signOut()
//     window.location.reload()
//   }

//   login(email: string, password: string) {
//     return signInWithEmailAndPassword(email, password)
//   }

//   register(email: string, password: string) {
//     return registerWithEmailAndPassword(email, password)
//   }

//   reauthenticate(password: string) {
//     return reauthenticateUser(password)
//   }

//   changePassword(password: string) {
//     return updatePassword(password)
//   }

//   changeEmail(email: string) {
//     return updateEmail(email)
//   }
// }
