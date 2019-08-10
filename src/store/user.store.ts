import { Dragonstone } from '@episodehunter/types'
import firebase from 'firebase'
import { action, observable } from 'mobx'
import { GqClient } from '../utils/gq-client'

export class User {
  @observable.ref private currentUser: firebase.User | null = null
  @observable.ref private matadata: Promise<Dragonstone.User> | null = null

  constructor(private gqClient: GqClient) {}

  @action
  setUser(user: firebase.User | null) {
    this.currentUser = user
  }

  getUser() {
    return this.currentUser
  }

  getMetadata(): Promise<Dragonstone.User> {
    if (!this.matadata) {
      this.matadata = this.gqClient<{ me: Dragonstone.User }>(
        `{
        me {
          username
          apikey
        }
      }`
      ).then(r => r.me)
    }
    return this.matadata
  }
}
