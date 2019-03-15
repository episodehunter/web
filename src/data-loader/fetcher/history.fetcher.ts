import { PublicTypes } from '../public-types'
import { Client } from './client'

export const createHistoryFetcher = (client: Client) => ({
  async fetchHistoryPage(page: number): Promise<PublicTypes.History[]> {
    return client<{ history: PublicTypes.History[] }>(
      `query getHistory($page: Int!) {
history(page: $page) {
  watchedEpisode {
    episode
    episodeNumber
    season
    showId
    time
    type
  }
  show {
    ids {
      tvdb
      id
    }
    name
  }
  episode {
    name
    tvdbId
  }
}
}
`,
      { page }
    ).then(result => {
      result.history.forEach(history => {
        history.watchedEpisode.time = new Date(history.watchedEpisode.time)
      })
      return result.history
    })
  }
})
