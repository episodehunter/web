import { observable } from 'mobx'
import { Dragonstone } from '@episodehunter/types'
import { BaseStore } from './base-store'

export class SearchStore extends BaseStore {
  @observable isSearchBarOpen: Boolean
  @observable searchResult: Dragonstone.Title[] = []

  openSearchBar() {
    this.isSearchBarOpen = true
  }

  closeSearchBar() {
    this.isSearchBarOpen = false
  }

  setSearchResult(searchResult: Dragonstone.Title[]) {
    this.searchResult = searchResult
  }
}
