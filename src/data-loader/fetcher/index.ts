import { createClient } from './client'
import { createShowFetcher } from './show.fetcher'
import { createUpcomingFetcher } from './upcoming.fetch'
import { createUserFetcher } from './user.fetcher'

export const createFetcher = (getIdToken: () => Promise<string>) => {
  const client = createClient(getIdToken)
  return {
    userFetcher: createUserFetcher(client),
    upcomingFetcher: createUpcomingFetcher(client),
    showFetcher: createShowFetcher(client)
  }
}

export type Fetcher = ReturnType<typeof createFetcher>
