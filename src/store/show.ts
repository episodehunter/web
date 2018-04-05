import { observable, computed } from 'mobx'
import { Episode } from './episode'
import { ShowResponse } from '../api/responses'
import { yyyymmdd } from '../utils/date.utils'

export class ShowStore {
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

  static createFromResponse(showResponse: ShowResponse) {
    const show = new ShowStore()
    show.id = showResponse.id
    show.tvdbId = showResponse.tvdbId
    show.name = showResponse.name
    show.overview = showResponse.overview
    show.genre = showResponse.genre
    show.language = showResponse.language
    show.network = showResponse.network
    show.runtime = showResponse.runtime
    show.ended = showResponse.ended
    show.imdbId = showResponse.imdbId
    show.firstAired = showResponse.firstAired
    show.airsDayOfWeek = showResponse.airsDayOfWeek
    show.airsTime = showResponse.airsTime
    show.episodes = showResponse.episodes.map(episodeResponse =>
      Episode.createFromResponse(episodeResponse)
    )
    return show
  }

  @computed
  get nextEpisode() {
    const now = yyyymmdd(new Date())
    const futureEpisodes = this.episodes.filter(
      episode => episode.firstAired > now
    )
    return futureEpisodes[0]
  }

  @computed
  get previousEpisode() {
    const now = yyyymmdd(new Date())
    const previousEpisodes = this.episodes.filter(
      episode => episode.firstAired < now
    )
    return previousEpisodes[0]
  }

  @computed
  get seasons() {
    return [...new Set(this.episodes.map(episode => episode.season))]
  }

  episodesPerSeason = (season: number) => {
    return this.episodes.filter(episode => episode.season === season)
  }
}
