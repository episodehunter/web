import firebaseApp from 'firebase/app'
import { createContext, createElement, memo, useContext, useEffect, useState } from 'react'
import { config } from '../config'
import { client } from '../apollo-client'
import { createAuth } from '../utils/auth.util'

export interface UserContext {
  currentUser?: firebase.User | null
  loadingCurrentUser: boolean
  auth: typeof auth
}

firebaseApp.initializeApp(config.firebaseAuth)

export const auth = createAuth(firebaseApp, () => client)

export const userContext = createContext<UserContext>({} as UserContext)
export const UserContextProvider = userContext.Provider

export const UserProvider = memo(({ children }: { children: JSX.Element }) => {
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  useEffect(() => {
    return auth.authStateChange$(currentUser => {
      setCurrentUser(currentUser)
      setLoadingCurrentUser(false)
    }, console.error)
  }, [])

  return createElement(
    UserContextProvider,
    {
      value: { currentUser, loadingCurrentUser, auth }
    },
    children
  )
})

export const useUser = () => {
  return useContext(userContext)
}
