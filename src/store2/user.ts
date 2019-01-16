import { User } from 'firebase'

export interface UserStore {
  currentUser: User | null | undefined
}

export const user: UserStore = {
  currentUser: undefined
}
