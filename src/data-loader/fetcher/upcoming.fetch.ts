import { PublicTypes } from '../public-types'
import { Client } from './client'

export const createUpcomingFetcher = (client: Client) => ({
  async fetchUpcomingEpisodes(showIds: string[]) {
    const ids = '"' + showIds.join('", "') + '"'
    return client<{ upcomingEpisode: PublicTypes.UpcomingEpisodesWithShowId[] }>(
      `upcomingEpisode(showIds: [${ids}]) {
  showId
  episodes {
    aired
    name
    season
    episode
    tvdbId
  }
}
`
    ).then(result => result.upcomingEpisode)
  }
})
