export declare namespace PublicTypes {
  interface Show extends ShowType {}
  type FollowingList = string[]
  interface Episode extends EpisodeType {}
  interface WatchedEpisode extends WatchedEpisodeType {}
  interface WhatToWatch extends WhatToWatchType {}
  interface UpcomingEpisodesWithShowId extends UpcomingEpisodesWithShowIdType {}
  interface UpcomingEpisode extends UpcomingEpisodeType {}
  interface History extends HistoryType {}
  interface Title extends TitleType {}
}

export interface ShowType {
  airs: {
    first: string | null
    time: string | null
    day: number | null
  }
  ended: boolean
  genre: string[]
  ids: {
    id: string
    imdb: string | null
    tvdb: number
  }
  language: string | null
  lastupdated: number
  name: string
  network: string | null
  numberOfFollowers: number
  overview: string
  runtime: number
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

interface TitleType {
  id: string
  followers: number
  name: string
  tvdbId: number
}
