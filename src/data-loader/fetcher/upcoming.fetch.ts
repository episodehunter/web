import { Client } from './client'

export interface UpcomingShowIds {
  tvdb: number
  id: number
}

export interface UpcomingShow {
  ids: UpcomingShowIds
  name: string
}

export interface UpcomingEpisode {
  aired: string
  name: string
  episodenumber: number
  tvdbId: number
}

export interface Upcoming {
  show: UpcomingShow
  upcomingEpisode: UpcomingEpisode | null
  justAirdEpisode: UpcomingEpisode | null
}

export const createUpcomingFetcher = (client: Client) => ({
  async fetchUpcoming(): Promise<Upcoming> {
    return client<{ following: Upcoming }>(
      `{
        following {
          show {
            ids {
              tvdb
              id
            }
            name
            upcomingEpisode {
              aired
              name
              episodenumber
              tvdbId
            }
            justAirdEpisode {
              aired
              name
              episodenumber
              tvdbId
            }
          }
        }
      }`
    ).then(result => result.following)
  }
})
