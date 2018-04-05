import { observable, computed, action } from 'mobx'
import { Episode } from './episode'
import { ShowResponse } from '../api/responses'
import { yyyymmdd } from '../utils/date.utils'
import { request } from '../request'

export class Show {
  @observable id: number
  @observable tvdbId: number
  @observable name: string
  @observable overview: string
  @observable genre: string[]
  @observable language: string
  @observable network: string
  @observable runtime: number
  @observable ended: boolean
  @observable imdbId: string
  @observable firstAired: Date
  @observable airsDayOfWeek: string
  @observable airsTime: string
  @observable episodes: Episode[]

  constructor(id: number) {
    this.id = id
  }

  load(): any {
    return request
      .show(this.id)
      .then(action((showResponse: ShowResponse) => this.update(showResponse)))
  }

  @action
  update(showResponse: ShowResponse) {
    this.tvdbId = showResponse.tvdbId
    this.name = showResponse.name
    this.overview = showResponse.overview
    this.genre = showResponse.genre
    this.language = showResponse.language
    this.network = showResponse.network
    this.runtime = showResponse.runtime
    this.ended = showResponse.ended
    this.imdbId = showResponse.imdbId
    this.firstAired = showResponse.firstAired
    this.airsDayOfWeek = showResponse.airsDayOfWeek
    this.airsTime = showResponse.airsTime
    this.episodes = showResponse.episodes.map(episodeResponse =>
      Episode.createFromResponse(episodeResponse)
    )
  }

  @computed
  get isAirDateForNextEpisodeDateUnknown() {
    return !this.ended && !Boolean(this.nextEpisode)
  }

  @computed
  get nextEpisode() {
    const now = yyyymmdd(new Date())
    return this.episodes.reduce((prevEpisode, episode) => {
      if (
        episode.firstAired &&
        episode.firstAired > now &&
        (!prevEpisode || episode.firstAired < prevEpisode.firstAired)
      ) {
        return episode
      }
      return prevEpisode
    }, null)
  }

  @computed
  get previousEpisode() {
    const now = yyyymmdd(new Date())
    return this.episodes.reduce((prevEpisode, episode) => {
      if (
        episode.firstAired &&
        episode.firstAired <= now &&
        (!prevEpisode || episode.firstAired > prevEpisode.firstAired)
      ) {
        return episode
      }
      return prevEpisode
    })
  }

  @computed
  get seasons() {
    return [...new Set(this.episodes.map(episode => episode.season))]
  }

  episodesPerSeason = (season: number) => {
    return this.episodes.filter(episode => episode.season === season)
  }
}
