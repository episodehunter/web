import { RootSore } from '../../store/root.store'
import { calculateEpisodeNumber } from '../../utils/episode.util'
import { Fetcher } from '../fetcher'
import { PublicTypes, WatchedEnum } from '../public-types'

export const createUserLoader = (
  { following, whatToWatch, shows, historyPage, watchedHistory }: RootSore,
  { userFetcher, showFetcher, historyFetcher }: Fetcher
) => ({
  async loadFolloingShowsIds() {
    if (following.loadingState.hasLoaded()) {
      return following.getFolloingShowsIdList()
    }
    following.loadingState.setLoading()
    const followingList = await userFetcher.fetchFolloingList()
    following.setFollowing(followingList)
    following.loadingState.setLoaded()
    return following.getFolloingShowsIdList()
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
    let fetchingMissingShows: Promise<(PublicTypes.Show | null)[]> = Promise.resolve([])
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
  },
  async followShow(showId: string) {
    try {
      following.startFollowing(showId)
      return await userFetcher.followShow(showId)
    } catch (error) {
      following.stopFollowing(showId)
      throw error
    }
  },
  async unfollowShow(showId: string) {
    try {
      following.stopFollowing(showId)
      return await userFetcher.unfollowShow(showId)
    } catch (error) {
      following.startFollowing(showId)
      throw error
    }
  },
  async checkInEpisode(showId: string, season: number, episode: number, time: Date) {
    const episodeNumber = calculateEpisodeNumber(season, episode)
    watchedHistory.addHistoryForShow(showId, {
      episode,
      season,
      showId,
      time,
      episodeNumber,
      type: WatchedEnum.checkIn
    })
    try {
      return await historyFetcher.checkInEpisode(showId, season, episode, time)
    } catch (error) {
      watchedHistory.removeHistoryForShow(showId, episodeNumber)
      throw error
    }
  },
  async removeCheckInEpisode(showId: string, watchedEpisode: PublicTypes.WatchedEpisode) {
    const episodeNumber = calculateEpisodeNumber(watchedEpisode.season, watchedEpisode.episode)
    watchedHistory.removeHistoryForShow(showId, episodeNumber)
    try {
      return await historyFetcher.removeCheckInEpisode(
        showId,
        watchedEpisode.season,
        watchedEpisode.episode
      )
    } catch (error) {
      watchedHistory.addHistoryForShow(showId, watchedEpisode)
      throw error
    }
  }
})
