import { configure } from 'mobx'
import { ShowStore } from './show.store'
import { User } from './user'
import { Following } from './following'

configure({ enforceActions: true })

class Store {
  showStore = new ShowStore()
  user = new User()
  following = new Following()
}

export const store = new Store()
