import { observable, action } from 'mobx'
import { fromEvent } from 'rxjs'
import { scan, filter, debounceTime } from 'rxjs/operators'

export class SearchStore {
  @observable show: boolean = false
  @observable searchText: string = ''
  subscription

  constructor() {
    this.createSubscription()
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
      this.subscription.unsubscribe()
    } else {
      this.createSubscription()
    }
  }
}
