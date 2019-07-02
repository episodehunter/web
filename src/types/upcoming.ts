export interface UpcomingShowIds {
  tvdb: number
  id: number
}

export interface UpcomingShow {
  ids: UpcomingShowIds
  name: string
  ended: boolean
  upcomingEpisode: UpcomingEpisode | null
  justAirdEpisode: UpcomingEpisode | null
}

export interface UpcomingEpisode {
  aired: string
  name: string
  episodenumber: number
}

export interface Upcoming {
  show: UpcomingShow
}
