export interface Episode {
  name: string
  tvdbId: number
  aired: string
  season: number
  episode: number
  episodeNumber: number
  overview: string
}

export interface Show {
  oldId: string
  ids: {
    id: string
    tvdb: number
    imdb?: string
  }
  airs: {
    day: number // 0-6
    first: string
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
  numberOfFollowers: number
  totalNumberOfEpisodes: number
  seasons: number[]
}

export interface WatchedEpisode {
  episode: number
  episodeNumber: number
  season: number
  showId: number
  time: {
    toDate: () => Date
  }
  type: WatchEnum
}

export enum WatchEnum {}

export interface UserMetaData {
  following: number[]
}

// export enum WatchEnum {}

// export type FbEpisode = Episode & {
//   aired: string
// }

// export type UpcomingEpisodes = {
//   nextEpisode: Episode | null
//   prevEpisode: Episode | null
// }

// export type CacheObj<T> = {
//   time: number
//   data: T
// }
