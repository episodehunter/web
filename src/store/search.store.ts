import { action, observable, reaction } from 'mobx'
import { fromEvent } from 'rxjs'
import { debounceTime, filter, scan } from 'rxjs/operators'
import { UserStore } from './user'

export class SearchStore {
  @observable show: boolean = false
  @observable searchText: string = ''
  subscription

  constructor(user: UserStore) {
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
  }

  createSubscription() {
    const keypress$ = fromEvent(document, 'keypress')
    this.subscription = keypress$
      .pipe(
        scan((acc, curr: any) => acc + curr.key, ''),
        filter(tot => tot.length > 2),
        debounceTime(50)
      )
      .subscribe(text => {
        this.toggleShow()
        this.setSearchText(text)
      })
  }

  @action
  setSearchText(text) {
    this.searchText = text
  }

  @action
  toggleShow() {
    this.show = !this.show
    if (this.show) {
      this.removeSubscription()
      this.setSearchText('')
    } else {
      this.createSubscription()
    }
  }

  @action
  removeSubscription() {
    this.subscription.unsubscribe()
  }
}
