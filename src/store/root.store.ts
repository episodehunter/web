import SearchWorker from 'worker-loader!../web-worker/search'
import { SearchStore } from './search.store'
import { User } from './user.store'

export class RootSore {
  user = new User()
  search = new SearchStore(new SearchWorker())
}
