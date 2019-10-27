import { createContext, useContext, useState, createElement, useEffect, memo } from 'react'
import { Dragonstone } from '@episodehunter/types'
import { useDebounce } from '../utils/use-debounce'

export interface SearchContext {
  isSearchBarOpen: boolean
  searchResult: Dragonstone.Title[]
  searchTerm: string
  search(msg: string): void
  openSearchBar(): void
  closeSearchBar(): void
  init(): void
}

export const searchContext = createContext<SearchContext>({} as SearchContext)
export const SearchContextProvider = searchContext.Provider

export const SearchProvider = memo(
  ({ children, searchWorker }: { children: JSX.Element; searchWorker: Worker }) => {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [searchResult, setSearchResult] = useState<Dragonstone.Title[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
      const callback = (event: MessageEvent) => {
        setSearchResult(event.data.result)
      }
      searchWorker.addEventListener('message', callback)
      return () => searchWorker.removeEventListener('message', callback)
    }, [])

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
      if (debouncedSearchTerm) {
        searchWorker.postMessage({
          type: 'search',
          data: debouncedSearchTerm
        })
      } else {
        setSearchResult([])
      }
    }, [debouncedSearchTerm])

    const init = () => {
      searchWorker.postMessage({
        type: 'fetch'
      })
    }

    const search = (msg: string) => setSearchTerm(msg)
    const openSearchBar = () => setIsSearchBarOpen(true)
    const closeSearchBar = () => {
      setSearchTerm('')
      setIsSearchBarOpen(false)
    }

    return createElement(
      SearchContextProvider,
      {
        value: {
          search,
          openSearchBar,
          closeSearchBar,
          isSearchBarOpen,
          searchResult,
          init,
          searchTerm
        }
      },
      children
    )
  }
)

export const useSearch = () => {
  return useContext(searchContext)
}
