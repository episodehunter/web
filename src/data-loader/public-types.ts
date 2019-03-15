export declare namespace PublicTypes {
  interface Show extends ShowType {}
  type FollowingList = string[]
  interface Episode extends EpisodeType {}
  interface WatchedEpisode extends WatchedEpisodeType {}
  interface WhatToWatch extends WhatToWatchType {}
  interface UpcomingEpisodesWithShowId extends UpcomingEpisodesWithShowIdType {}
  interface UpcomingEpisode extends UpcomingEpisodeType {}
  interface History extends HistoryType {}
}

export interface ShowType {
  airs: {
    first?: string
    time?: string
  }
  ended: boolean
  genre: string[]
  ids: {
    id: string
    imdb?: string
    tvdb: number
  }
  language?: string
  lastupdated: number
  name: string
  network?: string
  numberOfFollowers: number
  overview: string
  runtime: number
  seasons: number[]
  totalNumberOfEpisodes: number
}

interface UpcomingEpisodeType {
  aired: string
  name: string
  season: number
  episode: number
  tvdbId: number
}

export interface EpisodeType extends UpcomingEpisodeType {
  episodeNumber: number
  lastupdated: number
  overview: string
}

export enum WatchedEnum {
  kodiScrobble,
  kodiSync,
  checkIn,
  checkInSeason,
  plexScrobble
}

export interface WatchedEpisodeType {
  episode: number
  episodeNumber: number
  season: number
  showId: string
  time: Date
  type: WatchedEnum
}

export interface WhatToWatchType {
  showId: string
  numberOfEpisodesToWatch: number
}

export interface UpcomingEpisodesWithShowIdType {
  showId: string
  episodes: UpcomingEpisodeType[]
}

export interface HistoryType {
  watchedEpisode: WatchedEpisodeType
  show: Pick<ShowType, 'ids' | 'name'>
  episode: Pick<EpisodeType, 'name' | 'tvdbId'>
}
