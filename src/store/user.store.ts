import { Dragonstone } from '@episodehunter/types'
import firebase from 'firebase'
import { action, observable } from 'mobx'

export class User {
  @observable.ref private currentUser: firebase.User | null = null
  @observable.ref private matadata: Dragonstone.User | null = null

  @action
  setUser(user: firebase.User | null) {
    this.currentUser = user
  }

  getUser() {
    return this.currentUser
  }

  getMetadata() {
    return this.matadata
  }

  setMetadata(matadata: Dragonstone.User) {
    this.matadata = matadata
  }
}
