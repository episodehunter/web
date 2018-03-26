import { configure } from 'mobx'
import { UserStore } from './user'
import { FollowingStore } from './following'
import { ShowsStore } from './show.store'
import { UpcomingStore } from './upcoming'

configure({ enforceActions: true })

class Store {
  showStore = new ShowsStore()
  following = new FollowingStore(this.showStore)
  upcoming = new UpcomingStore(this.following)
  user = new UserStore(this.following)

  constructor() {
    // MOVE THIS
    if (this.user.isAuthenticated) {
      this.following.fetch()
    }
  }
}

export const store = new Store()
