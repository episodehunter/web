import { createContext, useContext } from 'react'
import { Emitter } from 'mitt'
import { RootSore } from './store/root.store'
import { Auth } from './utils/auth.util'
import { GqClient } from './utils/gq-client'

export interface GlobalContext {
  rootStore: RootSore
  auth: Auth
  gqClient: GqClient
  emitter: Emitter
}

export const globalContext = createContext<GlobalContext>({} as GlobalContext)

export const GlobalContextProvider = globalContext.Provider
export const GlobalContextConsumer = globalContext.Consumer

const hookCreator = <T>(map: (gc: GlobalContext) => T) => (): T => {
  const global = useContext(globalContext)
  return map(global)
}

export const useRootStore = hookCreator(g => g.rootStore)
export const useUser = hookCreator(g => g.rootStore.user)
export const useSearch = hookCreator(g => g.rootStore.search)
export const useAuth = hookCreator(g => g.auth)

export const useGqClient = hookCreator(g => g.gqClient)
export const useEmitter = hookCreator(g => g.emitter)
