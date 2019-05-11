import { Dragonstone } from '@episodehunter/types'
import { Client } from './client'

export const createHistoryFetcher = (client: Client) => ({
  async fetchHistoryPage(page: number): Promise<Dragonstone.History[]> {
    return client<{ history: Dragonstone.History[] }>(
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
  },
  async fetchWatchedHistory(showId: string) {
    const result = await client<{ watchedEpisodes: Dragonstone.WatchedEpisode.WatchedEpisode[] }>(`
      {
        watchedEpisodes(showId: "${showId}") {
          episodeNumber
          episode
          season
          showId
          time
          type
        }
      }
    `)
    result.watchedEpisodes.forEach(we => {
      we.time = new Date(we.time)
    })
    return result.watchedEpisodes
  },
  async checkInEpisode(showId: string, season: number, episode: number, time: Date) {
    const result = await client<{ checkInEpisode: boolean }>(`
      mutation {
        checkInEpisode(episode: {showId: "${showId}", season: ${season}, episode: ${episode}, time: "${time}", type: checkIn})
      }
    `)
    return result.checkInEpisode
  },
  async removeCheckInEpisode(showId: string, season: number, episode: number) {
    const result = await client<{ removeCheckedInEpisode: boolean }>(`
      mutation {
        removeCheckedInEpisode(episode: {showId: "${showId}", season: ${season}, episode: ${episode}})
      }
    `)
    return result.removeCheckedInEpisode
  }
})
