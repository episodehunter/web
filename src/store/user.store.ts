import { Dragonstone } from '@episodehunter/types'
import firebase from 'firebase'
import { action, observable } from 'mobx'
import { LoadingState } from './loading-state'

export class User {
  metadataLoadingState = new LoadingState()
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
