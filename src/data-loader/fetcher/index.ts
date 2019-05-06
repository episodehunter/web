import SearchWorker from 'worker-loader!../../web-worker/search'
import { Storage } from '../storage'
import { createClient } from './client'
import { createHistoryFetcher } from './history.fetcher'
import { createSearchFetcher } from './search.fetcher'
import { createShowFetcher } from './show.fetcher'
import { createUpcomingFetcher } from './upcoming.fetch'
import { createUserFetcher } from './user.fetcher'

export const createFetcher = (getIdToken: () => Promise<string>, storage: Storage) => {
  const client = createClient(getIdToken)
  const searchWorker = new SearchWorker()
  return {
    userFetcher: createUserFetcher(client),
    upcomingFetcher: createUpcomingFetcher(client),
    showFetcher: createShowFetcher(client, storage),
    historyFetcher: createHistoryFetcher(client),
    searchFetcher: createSearchFetcher(searchWorker)
  }
}

export type Fetcher = ReturnType<typeof createFetcher>
