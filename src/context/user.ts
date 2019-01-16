import { User } from 'firebase'
import React from 'react'

export interface UserContext {
  currentUser: User | null | undefined
}

export const userValue: UserContext = {
  currentUser: undefined
}

export const {
  Consumer: UserConsumer,
  Provider: UserProvider
} = React.createContext(userValue)
