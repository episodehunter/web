import { useStrict } from 'mobx'
import { ShowStore } from './show.store'

useStrict(true)

class Store {
  showStore = new ShowStore()
}

export const store = new Store()
