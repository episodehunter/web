import { createContext, useContext, useState, createElement, useEffect, memo } from 'react'
import { useGqClient, useAuth } from './global-context'
import { getMetadata } from '../dataloader/user'

export interface UserContext {
  currentUser?: firebase.User | null
  loadingCurrentUser: boolean
  metadata: LoadedMetadata | LoadingMetadata
  loadMetadata(): Promise<void>
}

export const userContext = createContext<UserContext>({} as UserContext)
export const UserContextProvider = userContext.Provider

type LoadedMetadata = {
  loaded: true
  data: { username: string; apikey: string }
}

type LoadingMetadata = {
  loaded: false
}

export const UserProvider = memo(({ children }: { children: JSX.Element }) => {
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [metadata, setMetadata] = useState<LoadedMetadata | LoadingMetadata>({ loaded: false })
  const auth = useAuth()
  const gqClient = useGqClient()
  useEffect(() => {
    return auth.authStateChange$(currentUser => {
      setCurrentUser(currentUser)
      setLoadingCurrentUser(false)
    }, console.error)
  }, [])

  const loadMetadata = async () => {
    if (metadata.loaded) {
      return undefined
    }
    const result = await getMetadata(gqClient)
    setMetadata({
      loaded: true,
      data: result
    })
  }

  return createElement(
    UserContextProvider,
    {
      value: { currentUser, loadingCurrentUser, metadata, loadMetadata }
    },
    children
  )
})

export const useUser = () => {
  return useContext(userContext)
}
