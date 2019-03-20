import firebase from 'firebase'
import { action, observable } from 'mobx'

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
