import Fuse, { FuseOptions } from 'fuse.js'
import { action, observable, reaction } from 'mobx'
import { fromEvent } from 'rxjs'
import { debounceTime, filter, scan } from 'rxjs/operators'
import { Title, TitlesStore } from './titles.store'
import { UserStore } from './user'

const debounce = (fn, time) => {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), time)
  }
}

export class SearchStore {
  updateSearchResultDebounce = debounce(this.updateSearchResult.bind(this), 200)

  @observable
  show: boolean = false
  @observable
  searchText: string = ''
  @observable
  result: Title[] = []
  fuse: Fuse = new Fuse([], fuseOptions)
  subscription

  constructor(user: UserStore, titles: TitlesStore) {
    reaction(
      () => user.isAuthenticated,
      isAuthenticated => {
        if (isAuthenticated) {
          this.createSubscription()
        } else {
          this.removeSubscription()
        }
      }
    )
    reaction(
      () => titles.titles,
      titles => {
        this.fuse = new Fuse(titles, fuseOptions)
      }
    )
  }

  createSubscription() {
    const keypress$ = fromEvent(document, 'keypress')
    this.subscription = keypress$
      .pipe(
        filter(
          (key: any) =>
            key.target &&
            key.target.nodeName &&
            key.target.nodeName.toLowerCase() !== 'input'
        ),
        scan((acc, curr: any) => acc + curr.key, ''),
        filter(tot => tot.length > 2),
        debounceTime(50)
      )
      .subscribe(text => {
        this.toggleSearchBar()
        this.setSearchText(text)
      })
  }

  @action
  setSearchText(text) {
    this.searchText = text
    this.updateSearchResultDebounce(this.searchText, this.fuse)
  }

  @action
  updateSearchResult(searchText: string, fuse: Fuse) {
    if (searchTextToShort(searchText)) {
      this.result = []
    } else {
      this.result = fuse.search<Title>(searchText).slice(0, 15)
    }
  }

  @action
  toggleSearchBar() {
    if (this.show) {
      this.hideSearchBar()
    } else {
      this.showSearchBar()
    }
  }

  @action
  hideSearchBar() {
    this.show = false
    this.createSubscription()
  }

  @action
  showSearchBar() {
    this.show = true
    this.removeSubscription()
    this.setSearchText('')
  }

  @action
  removeSubscription() {
    this.subscription.unsubscribe()
  }
}

const searchTextToShort = searchText => searchText.length < 3

const fuseOptions: FuseOptions = {
  shouldSort: true,
  keys: ['name'],
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.6,
  distance: 100
}
