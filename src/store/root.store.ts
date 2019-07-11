import { SearchStore } from './search.store'
import { User } from './user.store'

export class RootSore {
  user = new User()
  search = new SearchStore(this)
}
