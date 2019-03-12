import { RootSore } from '../store/root-store'
import { createFetcher } from './fetcher'
import { createUpcomingLoader } from './upcoming.loader'
import { createUserLoader } from './user.loader'

export const createLoaders = (rootStore: RootSore, getToken: () => Promise<string>) => {
  const fetcher = createFetcher(getToken)
  const getLoaders = () => loaders
  const loaders: Loaders = {
    userLoader: createUserLoader(rootStore, fetcher),
    upcomingLoader: createUpcomingLoader(rootStore, fetcher, getLoaders)
  }
  return loaders
}

export interface Loaders {
  userLoader: ReturnType<typeof createUserLoader>
  upcomingLoader: ReturnType<typeof createUpcomingLoader>
}
