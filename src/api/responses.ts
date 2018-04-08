export type EpisodeResponse = {
  name: string
  tvdbId: number
  firstAired: string
  season: number
  episode: number
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
  firstAired: Date
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
