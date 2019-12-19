import { createContext, createElement, memo, useContext, useEffect, useState } from 'react'
import AuthWorker from 'worker-loader!../web-worker/auth'
import { client } from '../apollo-client'
import { createAuth } from '../utils/auth.util'

export interface UserContext {
  authenticated?: boolean | null
  loadingCurrentUser: boolean
  auth: typeof auth
}

const authWorker = new AuthWorker()

export const auth = createAuth(authWorker, () => client)

export const userContext = createContext<UserContext>({} as UserContext)
export const UserContextProvider = userContext.Provider

export const UserProvider = memo(({ children }: { children: JSX.Element }) => {
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    return auth.authStateChange$(currentUser => {
      setAuthenticated(currentUser)
      setLoadingCurrentUser(false)
    }, console.error)
  }, [])

  return createElement(
    UserContextProvider,
    {
      value: { authenticated, loadingCurrentUser, auth }
    },
    children
  )
})

export const useUser = () => {
  return useContext(userContext)
}
