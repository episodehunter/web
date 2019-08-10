import { observable } from 'mobx'
import { Dragonstone } from '@episodehunter/types'

export class SearchStore {
  @observable isSearchBarOpen: Boolean
  @observable searchResult: Dragonstone.Title[] = []
  private searchWorker: Worker

  constructor(searchWorker: Worker) {
    this.searchWorker = searchWorker
    searchWorker.addEventListener('message', (event: MessageEvent) => {
      this.setSearchResult(event.data.result)
    })
  }

  search(searchString: string) {
    this.searchWorker.postMessage(searchString)
  }

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
