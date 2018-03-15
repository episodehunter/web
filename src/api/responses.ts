export type EpisodeResponse = {
  name: string
  tvdbId: number
  firstAired: Date
  season: number
}

export type ShowResponse = {
  id: number
  tvdbId: number
  name: string
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
  following: ShowResponse[]
}

export type UserInfoResponse = {
  nickname: string
  picture: string
}
