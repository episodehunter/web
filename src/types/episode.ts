import { WatchedEnum } from '@episodehunter/types/dragonstone/watched-episode'

export interface WatchedEpisode {
  time: number
  type: WatchedEnum
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
