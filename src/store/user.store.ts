import firebase from 'firebase'
import { action, observable } from 'mobx'
import { createStore } from './create-store'

export const {
  useStore: userUser,
  StateProvider: UserProvider,
  setState: setUser
} = createStore({
  currentUser: null
} as {
  currentUser: firebase.User | null
})

export class User {
  @observable.ref private currentUser: firebase.User | null

  @action
  setUser(user: firebase.User | null) {
    this.currentUser = user
  }

  getUser() {
    return this.currentUser
  }
}
