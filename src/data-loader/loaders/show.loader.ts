import { Loaders } from '.'
import { RootSore } from '../../store/root.store'
import { Fetcher } from '../fetcher'

export const createShowLoader = (
  { shows, showPage, watchedHistory, episodes }: RootSore,
  { showFetcher, historyFetcher }: Fetcher,
  getLoaders: () => Loaders
) => ({
  async loadShowForShowPage(showId: string) {
    const { userLoader } = getLoaders()
    userLoader.loadFolloingShowsIds()
    showPage.setShowId(showId)
    showPage.loadingState.setLoading()
    const fetchingShow = showFetcher.fetchShow([showId])
    const fetchingEpisodes = showFetcher.fetchEpisodes(showId)
    const fetchingWatchedHistory = historyFetcher.fetchWatchedHistory(showId)
    const [[show], episodesForShow, watchedHistoryForShow] = await Promise.all([
      fetchingShow,
      fetchingEpisodes,
      fetchingWatchedHistory
    ])
    shows.add(show)
    episodes.setEpisodesForShow(showId, episodesForShow)
    watchedHistory.setHistoryForShow(showId, watchedHistoryForShow)
    const nextEpisodeToWatch = episodes.findNextEpisodeToWatch(showId)
    if (nextEpisodeToWatch) {
      showPage.selectedSeason = nextEpisodeToWatch.season
    } else {
      showPage.selectedSeason = 1
    }
    showPage.loadingState.setLoaded()
    return
  }
})
