import { PublicTypes } from '../public-types'
import { Client } from './client'

function createQuery(id: string) {
  return `id${id}: show(id: "${id}") {
    name,
    airs {
      first
      time
    },
    ended,
    genre,
    ids {
      id
      imdb
      tvdb
    }
    language
    network
    numberOfFollowers
    overview
    runtime
    seasons
    totalNumberOfEpisodes
  }
  `
}

export const createShowFetcher = (client: Client) => ({
  async fetchShow(ids: string[]) {
    const query = '{' + ids.map(createQuery).join('\r\n') + '}'
    const result = await client<{ [key: string]: PublicTypes.Show }>(query)
    return Object.values(result)
  },
  async fetchEpisodes(showId: string) {
    const result = await client<{ episodes: PublicTypes.Episode[] }>(`
      {
        episodes(showId: "${showId}") {
          name
          aired
          episode
          season
          overview
          tvdbId
          episodeNumber
        }
      }
    `)
    return result.episodes
  }
})
