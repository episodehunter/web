import { startOfDay } from 'date-fns'
import { action, computed, observable } from 'mobx'
import { uniqWith } from 'ramda'
import { ShowResponse } from '../api/responses'
import { ShowRequestType } from '../enum/request-type'
import { Request } from '../request'
import {
  isSameEpisode,
  nextEpisode,
  nextEpisodeToWatch,
  previousEpisode
} from '../utils/episode.util'
import { ModelLoader } from '../utils/model-loader.util'
import { Episode, EpisodeWithAirDate } from './episode'
import { HistoryStore } from './history.store'

export class Show {
  @observable
  id: number

  @observable
  tvdbId: number

  @observable
  name: string

  @observable
  overview: string

  @observable
  genre: string[]

  @observable
  language: string

  @observable
  network: string

  @observable
  runtime?: number

  @observable
  ended: boolean

  @observable
  imdbId: string

  @observable
  firstAired: Date

  @observable
  airsDayOfWeek: string

  @observable
  airsTime: string

  @observable
  numberOfFollowers?: number

  @observable
  episodes: Episode[] = []

  loader = new ModelLoader<ShowRequestType>()
  private history: HistoryStore

  constructor(request: Request, history: HistoryStore, id: number) {
    this.id = id
    this.history = history
    const requestShow = (type: ShowRequestType) => request.show(this.id, type)
    const updateShow = show => this.update(show)
    this.loader.register(requestShow)(updateShow)
  }

  load(type: ShowRequestType): void {
    this.loader.load(type)
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
    this.numberOfFollowers = showResponse.numberOfFollowers
    this.episodes = showResponse.episodes.map(episodeResponse =>
      Episode.createFromResponse(this.id, episodeResponse, this.history)
    )
  }

  @computed
  get nextEpisodeToWatch() {
    return nextEpisodeToWatch(this.watchHistory, this.episodes)
  }

  get watchHistory() {
    return this.history.getHistoryForShow(this.id).history
  }

  @computed
  get numberOfWatchedEpisodes() {
    return uniqWith(
      isSameEpisode,
      this.history.getHistoryForShow(this.id).history
    ).length
  }

  @computed
  get numberOfEpisodeToWatch() {
    const history = this.history.getHistoryForShow(this.id)
    return this.episodes.filter(
      episode => episode.hasAird && !history.haveSeenEpisode(episode)
    ).length
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
