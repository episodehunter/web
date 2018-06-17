import { User } from 'firebase'
import { action, computed, observable } from 'mobx'
import {
  authStateChange$,
  signInWithEmailAndPassword,
  signOut
} from '../utils/auth.util'

export class UserStore {
  @observable.ref user: User | null | undefined = undefined

  constructor() {
    authStateChange$.subscribe(user => this.setUser(user))
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
    return signOut()
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(email, password)
  }
}
