export type Db = firebase.firestore.Firestore

export type UserMetaData = {
  following: FollowingId[]
}

export type Show = {
  id: string
  ids: {
    tvdb: number
    imdb?: string
  }
  name: string
  ended: boolean
}

export type Episode = {
  aired: Date
  episodeNumber: number
}

export type FbEpisode = {
  aired: string
  episodeNumber: number
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
