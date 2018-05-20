import { startOfDay } from 'date-fns'
import { action, computed, observable } from 'mobx'
import { ShowResponse } from '../api/responses'
import { request } from '../request'
import { nextEpisode, previousEpisode } from '../utils/episode.util'
import { ModelLoader } from '../utils/model-loader.util'
import { Episode, EpisodeWithAirDate } from './episode'

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
  @observable episodes: Episode[] = []
  loader = new ModelLoader()

  constructor(id: number) {
    this.id = id
    const requestShow = () => request.show(this.id)
    const updateShow = show => this.update(show)
    this.loader.register(requestShow)(updateShow)
  }

  @action
  load(): void {
    this.loader.load()
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
    this.firstAired = startOfDay(new Date(showResponse.firstAired))
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
    return nextEpisode(this.episodes)
  }

  @computed
  get previousEpisode() {
    return previousEpisode(this.episodes)
  }

  @computed
  get seasons() {
    return [...new Set(this.episodes.map(episode => episode.season))]
  }

  episodesPerSeason = (season: number) => {
    return this.episodes.filter(episode => episode.season === season)
  }
}

export interface ShowWithPreviousEpisode extends Show {
  previousEpisode: EpisodeWithAirDate
}

export interface ShowWithNextEpisode extends Show {
  nextEpisode: EpisodeWithAirDate
}
