export type EpisodeResponse = {
  name: string
}

export type ShowResponse = {
  id: number
  tvdbId: number
  name: string
  episodes: EpisodeResponse[]
}

export type FollowingResponse = {
  following: ShowResponse[]
}
