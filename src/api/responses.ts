export type EpisodeResponse = {
  name: string
  tvdbId: number
  firstAired: string
  season: number
  episode: number
  overview: string
}

export type ShowResponse = {
  id: number
  tvdbId: number
  name: string
  overview: string
  genre: string[]
  language: string
  network: string
  runtime: number
  ended: boolean
  imdbId: string
  firstAired: string
  airsDayOfWeek: string
  airsTime: string
  episodes: EpisodeResponse[]
}

export type FollowingResponse = {
  following: { id: number }[]
}

export type UserInfoResponse = {
  nickname: string
  picture: string
}

export type TitlesResponse = {
  id: string
  name: string
  tvdbId: number
}[]
