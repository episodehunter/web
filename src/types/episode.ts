import { Dragonstone } from '@episodehunter/types'

export interface WatchedEpisode {
  time: number
  type: Dragonstone.WatchedEpisode.WatchedEnum
}

export interface SeasonEpisode {
  name: string
  ids: {
    showId: number
    tvdb: number
  }
  aired: string
  overview: string | null
  episodenumber: number
  watched: WatchedEpisode[]
}
