import { Dragonstone } from '@episodehunter/types'
import { Loaders } from '.'
import { RootSore } from '../../store/root.store'
import { Fetcher } from '../fetcher'

export const createUpcomingLoader = (
  { upcomingEpisodes, shows }: RootSore,
  fetcher: Fetcher,
  getLoaders: () => Loaders
) => ({
  async loadUpcoming() {
    upcomingEpisodes.loadingState.setLoading()
    try {
      const upcoming = await fetcher.upcomingFetcher.fetchUpcoming()
      upcomingEpisodes.add
      upcomingEpisodes.loadingState.setLoaded()
    } catch (error) {}

    const followingList = await userLoader.loadFolloingShowsIds()
    upcomingEpisodes.keep(followingList)

    const missingIds = followingList.filter(id => !upcomingEpisodes.has(id))
    let fetchingUpcoming: Promise<Dragonstone.UpcomingEpisode[]> = Promise.resolve([])
    if (missingIds.length) {
      fetchingUpcoming = fetcher.upcomingFetcher.fetchUpcoming(missingIds)
    }

    const missingShowsIds = followingList.filter(id => !shows.has(id))
    let fetchingMissingShows: Promise<(Dragonstone.Show | null)[]> = Promise.resolve([])
    if (missingShowsIds.length) {
      fetchingMissingShows = fetcher.showFetcher.fetchShow(missingShowsIds)
    }

    const upcomings = await fetchingUpcoming
    upcomings.forEach(upcoming => upcomingEpisodes.add(upcoming))

    const missingShows = await fetchingMissingShows
    missingShows.forEach(show => shows.add(show))

    upcomingEpisodes.loadingState.setLoaded()
    return upcomingEpisodes.upcomingEpisodes
  }
})
