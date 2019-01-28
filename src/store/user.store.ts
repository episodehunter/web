import firebase from 'firebase'
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
