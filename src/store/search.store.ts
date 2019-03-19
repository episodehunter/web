import { observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { BaseStore } from './base-store'

export class Search extends BaseStore {
  @observable isSearchBarOpen: Boolean
  @observable searchResult: PublicTypes.Title[] = []

  openSearchBar() {
    this.isSearchBarOpen = true
  }

  closeSearchBar() {
    this.isSearchBarOpen = false
  }

  setSearchResult(searchResult: PublicTypes.Title[]) {
    this.searchResult = searchResult
  }
}
