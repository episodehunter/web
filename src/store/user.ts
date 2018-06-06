import { User } from 'firebase'
import { action, computed, observable } from 'mobx'
import { UserApiClient, createUserApiClient } from '../api/api'
import {
  authStateChange$,
  getIdToken,
  signInWithEmailAndPassword,
  signOut
} from '../utils/auth.util'

export class UserStore {
  @observable.ref user: User | null | undefined = undefined
  apiClient: UserApiClient

  constructor() {
    authStateChange$.subscribe(user => this.setUser(user))
    this.apiClient = createUserApiClient(getIdToken)
  }

  @action
  setUser(user) {
    this.user = user
  }

  @computed
  get isAuthenticated() {
    return Boolean(this.user)
  }

  signOut() {
    signOut()
  }

  login(email: string, password: string) {
    console.log('login in with', email, password)
    return signInWithEmailAndPassword(email, password)
  }
}
