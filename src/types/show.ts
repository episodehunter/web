import { ShowId } from '@episodehunter/types'

export interface NextEpisodeToWatch {
  ids: {
    tvdb: number
  }
  name: string
  aired: string
  episodenumber: number
}

export interface NextToWatchShow {
  numberOfEpisodesToWatch: number
  episode: NextEpisodeToWatch | null
}

export interface Show {
  name: string
  airs: {
    first: string | null
    time: string | null
    day: number | null
  }
  ended: boolean
  genre: string[]
  ids: {
    id: ShowId
    tvdb: number
  }
  language: string | null
  network: string | null
  overview: string | null
  runtime: number
  seasons: number[] // TODO
  numberOfAiredEpisodes: number // TODO
  nextToWatch: NextToWatchShow
  followers: number
  isFollowing: boolean // TODO
}
