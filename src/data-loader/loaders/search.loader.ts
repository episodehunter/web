import { RootSore } from '../../store/root.store'
import { Fetcher } from '../fetcher'

export const createSearchLoader = ({ search }: RootSore, { searchFetcher }: Fetcher) => ({
  subscribe() {
    return searchFetcher.subscribe(result => {
      search.setSearchResult(result)
    })
  },
  searchDebounce: debounce(200, (term: string) => {
    searchFetcher.search(term)
  })
})

const debounce = <T extends any[], R>(time: number, fn: (...args: T) => R) => {
  let timeout: any

  return (...args: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), time)
  }
}
