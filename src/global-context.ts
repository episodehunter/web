import { createContext, useContext } from 'react'
import { Loaders } from './data-loader/loaders'
import { RootSore } from './store/root-store'

export interface GlobalContext {
  rootStore: RootSore
  loaders: Loaders
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
export const useUpcomingEpisodes = hookCreator(g => g.rootStore.upcomingEpisodes)
export const useWhatToWatch = hookCreator(g => g.rootStore.whatToWatch)
export const useHistoryPage = hookCreator(g => g.rootStore.historyPage)
export const useSearch = hookCreator(g => g.rootStore.search)
export const useSearchLoader = hookCreator(g => g.loaders.searchLoader)
