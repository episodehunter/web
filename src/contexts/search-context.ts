import { createContext, useContext, useState, createElement, useEffect, memo } from 'react'
import { Dragonstone } from '@episodehunter/types'
import { useDebounce } from '../utils/use-debounce'
import { captureException } from '@sentry/browser'

export interface SearchContext {
  searchResult: Dragonstone.Title[]
  searchTerm: string
  fetchStataus: 'loaded' | 'loading' | 'error' | 'not loaded'
  search(msg: string): void
}

export const searchContext = createContext<SearchContext>({} as SearchContext)
export const SearchContextProvider = searchContext.Provider

export const SearchProvider = memo(
  ({ children, searchWorker }: { children: JSX.Element; searchWorker: Worker }) => {
    const [searchResult, setSearchResult] = useState<Dragonstone.Title[]>([])
    const [fetchStataus, setFetchStataus] = useState<'loaded' | 'loading' | 'error' | 'not loaded'>(
      'not loaded'
    )
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
      const callback = (event: MessageEvent) => {
        setSearchResult(event.data.result)
        setFetchStataus(event.data.fetchStatus)
        if (event.data.error) {
          captureException(event.data.error)
        }
      }
      searchWorker.addEventListener('message', callback)
      return () => searchWorker.removeEventListener('message', callback)
    }, [])

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
      if (debouncedSearchTerm) {
        searchWorker.postMessage({
          type: 'search',
          data: debouncedSearchTerm,
        })
      } else {
        setSearchResult([])
      }
    }, [debouncedSearchTerm])

    const search = (msg: string) => setSearchTerm(msg)

    return createElement(
      SearchContextProvider,
      {
        value: {
          search,
          searchResult,
          fetchStataus,
          searchTerm,
        },
      },
      children
    )
  }
)

export const useSearch = () => {
  return useContext(searchContext)
}
