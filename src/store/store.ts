import { configure } from 'mobx'
import { UserStore } from './user'
import { Following } from './following'
import { ShowStore } from './show.store'
import { UpcomingStore } from './upcoming'

configure({ enforceActions: true })

class Store {
  showStore = new ShowStore()
  following = new Following(this.showStore)
  upcoming = new UpcomingStore(this.following)
  user = new UserStore(this.following)

  constructor() {
    // TODO: MOVE THIS
    if (this.user.isAuthenticated) {
      this.following.updateFollwing()
    }
  }
}

export const store = new Store()
