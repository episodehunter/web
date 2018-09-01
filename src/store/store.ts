import { configure, reaction } from 'mobx'
import { Dispatch } from '../actions/dispatcher'
import { Request } from '../request'
import { Following } from './following'
import { HistoryStore } from './history.store'
import { SearchStore } from './search.store'
import { ShowStore } from './show.store'
import { TitlesStore } from './titles.store'
import { UpcomingStore } from './upcoming'
import { UserStore } from './user'

configure({ enforceActions: 'observed' })

export class Store {
  showStore: ShowStore
  following: Following
  upcoming: UpcomingStore
  user: UserStore
  titles: TitlesStore
  search: SearchStore
  history: HistoryStore

  constructor(dispatch: Dispatch, request: Request) {
    this.history = new HistoryStore(request)
    this.showStore = new ShowStore(request, this.history)
    this.user = new UserStore()
    this.following = new Following(this.showStore, request, dispatch)
    this.upcoming = new UpcomingStore(this.following)
    this.user = new UserStore()
    this.titles = new TitlesStore(request)
    this.search = new SearchStore(this.user, this.titles)

    // TODO: MOVE THIS
    reaction(
      () => this.user.isAuthenticated,
      isAuthenticated => {
        if (isAuthenticated) {
          this.following.loadFollowingShows()
          this.titles.fetchTitles()
        }
      },
      { fireImmediately: true }
    )
  }
}
