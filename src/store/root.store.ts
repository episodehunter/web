import SearchWorker from 'worker-loader!../web-worker/search'
import { SearchStore } from './search.store'
import { User } from './user.store'
import { GqClient } from '../utils/gq-client'

export class RootSore {
  user: User
  search: SearchStore

  constructor(gqClient: GqClient) {
    this.user = new User(gqClient)
    this.search = new SearchStore(new SearchWorker())
  }
}
