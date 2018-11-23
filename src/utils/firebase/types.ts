export type Db = firebase.firestore.Firestore

export type UserMetaData = {
  following: FollowingId[]
}

export type StatusType = 'loading' | 'updating' | 'loaded' | 'unknown'
export type SourceType = 'cache' | 'network' | 'none'

export type State<T> = LoadingState | LoadedState<T> | UnknownState

export interface BaseState<T> {
  data: T | null
  status: StatusType
  source: SourceType
}

export interface UnknownState extends BaseState<undefined> {
  status: 'unknown'
  source: 'none'
}

export interface LoadingState extends BaseState<undefined> {
  status: 'loading'
  source: 'none'
}

export interface LoadedState<T> extends BaseState<T> {
  status: 'loaded'
}

export type Show = {
  id: string
  ids: {
    tvdb: number
    imdb?: string
  }
  airs: {
    day: number // 0-6
    fisrt: string
    time: string
  }
  ended: boolean
  genre: string[]
  language: string
  lastupdated: number
  name: string
  network: string
  overview: string
  runtime: number
  numberOfFollowers: 0
  numberOfEpisodes: 0
}

export type Episode = {
  name: string
  tvdbId: number
  aired: Date
  season: number
  episode: number
  episodeNumber: number
}

export type FbEpisode = Episode & {
  aired: string
}

export type UpcomingEpisodes = {
  nextEpisode: Episode | null
  prevEpisode: Episode | null
}

export type ShowWithUpcomingEpisodes = Show & UpcomingEpisodes

export type ShowWithEpisodesToWatch = Show & { episodesToWatch: Episode[] }

export type FollowingId = number

export type CacheObj<T> = {
  time: number
  data: T
}
