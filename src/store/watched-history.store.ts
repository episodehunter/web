import { action, observable } from 'mobx'
import { Dragonstone } from '@episodehunter/types'
import { BaseStore } from './base-store'

export class WatchedHistoryStore extends BaseStore {
  @observable private historyForShow: Map<
    string,
    Dragonstone.WatchedEpisode.WatchedEpisode[]
  > = new Map()

  @action
  setHistoryForShow(showId: string, history: Dragonstone.WatchedEpisode.WatchedEpisode[]) {
    this.historyForShow.set(showId, history)
  }

  @action
  addHistoryForShow(showId: string, history: Dragonstone.WatchedEpisode.WatchedEpisode) {
    const historyForShow = this.getHistoryForShow(showId)
    historyForShow.push(history)
  }

  @action
  removeHistoryForShow(showId: string, episodeNumber: number) {
    const historyForShow = this.getHistoryForShow(showId)
    const newHistoryForShow = historyForShow.filter(h => h.episodeNumber !== episodeNumber)
    this.setHistoryForShow(showId, newHistoryForShow)
  }

  getHistoryForSeason(showId: string, season: number) {
    return this.getHistoryForShow(showId).filter(e => e.season === season)
  }

  getHistoryForShow(showId: string) {
    const historyForShow = this.historyForShow.get(showId)
    return historyForShow || []
  }

  getHighestEpisodeNumber(showId: string) {
    return this.getHistoryForShow(showId).reduce((highestEpisodeNumber, we) => {
      return we.episodeNumber > highestEpisodeNumber ? we.episodeNumber : highestEpisodeNumber
    }, 0)
  }

  getNumberOfWatchedEpisodes(showId: string) {
    return new Set(this.getHistoryForShow(showId).map(e => e.episodeNumber)).size
  }
}
