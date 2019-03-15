import { RootSore } from '../../store/root-store'
import { Fetcher } from '../fetcher'
import { PublicTypes } from '../public-types'

export const createUserLoader = (
  { following, whatToWatch, shows, historyPage }: RootSore,
  { userFetcher, showFetcher, historyFetcher }: Fetcher
) => ({
  async loadFolloingShowsIds() {
    if (following.loadingState.hasLoaded()) {
      return following.folloingShowsIds
    }
    following.loadingState.setLoading()
    const followingList = await userFetcher.fetchFolloingList()
    following.setFollowing(followingList)
    following.loadingState.setLoaded()
    return followingList
  },
  async loadWhatToWatch() {
    whatToWatch.loadingState.setLoading()
    const followingList = await this.loadFolloingShowsIds()
    whatToWatch.keep(followingList)

    const missingIds = followingList.filter(id => !whatToWatch.has(id))
    let fetchingWhatToWatch: Promise<PublicTypes.WhatToWatch[]> = Promise.resolve([])
    if (missingIds.length) {
      fetchingWhatToWatch = userFetcher.fetchWhatToWatch(missingIds)
    }

    const missingShowsIds = followingList.filter(id => !shows.has(id))
    let fetchingMissingShows: Promise<PublicTypes.Show[]> = Promise.resolve([])
    if (missingShowsIds.length) {
      fetchingMissingShows = showFetcher.fetchShow(missingShowsIds)
    }

    const whatToWatchResult = await fetchingWhatToWatch
    whatToWatchResult.forEach(wtw => whatToWatch.add(wtw))

    const missingShows = await fetchingMissingShows
    missingShows.forEach(show => shows.add(show))

    whatToWatch.loadingState.setLoaded()
    return whatToWatch.data
  },
  async loadHistoryPage(page: number) {
    if (historyPage.loadingState.isLoading()) {
      return historyPage.history
    } else if (historyPage.loadingState.hasLoaded()) {
      historyPage.loadingState.setUpdating()
    } else {
      historyPage.loadingState.setLoading()
    }
    const history = await historyFetcher.fetchHistoryPage(page)
    historyPage.addHistory(page, history)
    historyPage.loadingState.setLoaded()
  }
})
