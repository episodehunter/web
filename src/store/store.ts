import { configure } from 'mobx'
import { FrontPageShowStore } from './front-page-show.store'
import { User } from './user'
import { Following } from './following'
import { ShowStore } from './show.store'

configure({ enforceActions: true })

const showStore = new ShowStore()

class Store {
  frontPageShowStore = new FrontPageShowStore()
  user = new User()
  showStore = showStore
  following = new Following(showStore)
}

export const store = new Store()
