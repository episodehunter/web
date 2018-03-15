import { useStrict } from 'mobx'
import { ShowStore } from './show.store'
import { User } from './user'
import { Following } from './following'

useStrict(true)

class Store {
  showStore = new ShowStore()
  user = new User()
  following = new Following()
}

export const store = new Store()
