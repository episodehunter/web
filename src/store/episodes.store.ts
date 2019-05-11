import { action, observable } from 'mobx'
import { Dragonstone } from '@episodehunter/types'
import { yyyymmdd } from '../utils/date.utils'
import { BaseStore } from './base-store'

export class EpisodesStore extends BaseStore {
  @observable private episodesForShow: Map<string, Dragonstone.Episode[]> = new Map()

  @action
  setEpisodesForShow(showId: string, episodes: Dragonstone.Episode[]) {
    this.episodesForShow.set(showId, episodes.sort((a, b) => a.episodeNumber - b.episodeNumber))
  }

  getSeasons(showId: string) {
    return Array.from(new Set(this.getEpisodes(showId).map(episode => episode.season)))
  }

  getEpisodes(showId: string, season?: number) {
    const episodesForShow = this.episodesForShow.get(showId)
    if (!episodesForShow) {
      return []
    }
    if (typeof season === 'number') {
      return episodesForShow.filter(e => e.season === season)
    }
    return episodesForShow
  }

  getNumberOfEpisodes(showId: string) {
    return this.getEpisodes(showId).length
  }

  getPossibleEpisodesToWatch(showId: string) {
    const nowString = yyyymmdd(new Date())
    return this.getEpisodes(showId).filter(e => e.aired <= nowString)
  }

  getNumberOfPossibleEpisodesToWatch(showId: string) {
    return this.getPossibleEpisodesToWatch(showId).length
  }

  getNumberOfEpisodesToWatch(showId: string): number {
    const possibleEpisodesToWatch = this.getPossibleEpisodesToWatch(showId)
    const history = this.rootStore.watchedHistory.getHistoryForShow(showId)
    let n = 0
    possibleEpisodesToWatch.forEach(e => {
      if (history.some(h => h.episodeNumber === e.episodeNumber)) {
        n = n + 1
      }
    })
    return n
  }

  findNextEpisodeToWatch(showId: string): Dragonstone.Episode | null {
    const highestWatchedEpisodeNumber = this.rootStore.watchedHistory.getHighestEpisodeNumber(
      showId
    )
    const episodes = this.getEpisodes(showId)
    let nextEpisode: Dragonstone.Episode | null = null
    for (let episode of episodes) {
      if (episode.episodeNumber > highestWatchedEpisodeNumber) {
        if (!nextEpisode || nextEpisode.episodeNumber > episode.episodeNumber) {
          nextEpisode = episode
        }
      }
    }
    return nextEpisode
  }
}
