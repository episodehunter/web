import { configure, reaction } from 'mobx'
import { Dispatch } from '../actions/dispatcher'
import { Following } from './following'
import { SearchStore } from './search.store'
import { ShowStore } from './show.store'
import { TitlesStore } from './titles.store'
import { UpcomingStore } from './upcoming'
import { UserStore } from './user'

configure({ enforceActions: true })

export class Store {
  showStore: ShowStore
  following: Following
  upcoming: UpcomingStore
  user: UserStore
  titles: TitlesStore
  search: SearchStore

  constructor(dispatch: Dispatch) {
    this.showStore = new ShowStore()
    this.user = new UserStore()
    this.following = new Following(this.showStore, this.user, dispatch)
    this.upcoming = new UpcomingStore(this.following)
    this.user = new UserStore()
    this.titles = new TitlesStore()
    this.search = new SearchStore(this.user, this.titles)

    // TODO: MOVE THIS
    reaction(
      () => this.user.isAuthenticated,
      isAuthenticated => {
        if (isAuthenticated) {
          this.following.updateFollwing()
          this.titles.fetchTitles()
        }
      },
      { fireImmediately: true }
    )
  }
}
