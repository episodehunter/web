import { configure, reaction } from 'mobx'
import { Dispatch } from '../actions/dispatcher'
import { Following } from './following'
import { ShowStore } from './show.store'
import { UpcomingStore } from './upcoming'
import { UserStore } from './user'

configure({ enforceActions: true })

export class Store {
  showStore: ShowStore
  following: Following
  upcoming: UpcomingStore
  user: UserStore

  constructor(dispatch: Dispatch) {
    this.showStore = new ShowStore()
    this.user = new UserStore()
    this.following = new Following(this.showStore, this.user, dispatch)
    this.upcoming = new UpcomingStore(this.following)

    // TODO: MOVE THIS
    reaction(
      () => this.user.isAuthenticated,
      isAuthenticated => isAuthenticated && this.following.updateFollwing(),
      { fireImmediately: true }
    )
  }
}
