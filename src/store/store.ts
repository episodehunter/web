import { useStrict } from 'mobx'
import { ShowStore } from './show.store'
import { User } from './user.store'

useStrict(true)

class Store {
  showStore = new ShowStore()
  user = new User()
}

export const store = new Store()
