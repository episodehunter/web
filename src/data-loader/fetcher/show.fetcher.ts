import { Dragonstone } from '@episodehunter/types'
import { Storage } from '../storage'
import { StorageObject } from '../storage/idb'
import { Client } from './client'

function createQuery(id: string, index: number) {
  return `id${index}: show(id: "${id}") {
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
  }
  `
}

const getExistingShows = async (storage: Storage, ids: string[]): Promise<Dragonstone.Show[]> => {
  const existingAndNonExistingShows = await Promise.all(
    ids.map(id => storage.showStorage.findShow(id))
  )
  const shows = existingAndNonExistingShows.filter(Boolean) as StorageObject<Dragonstone.Show>[]
  return shows.map(so => so.value)
}

export const createShowFetcher = (client: Client, storage: Storage) => ({
  async fetchShow(ids: string[]): Promise<(Dragonstone.Show | null)[]> {
    const existingShows = await getExistingShows(storage, ids)
    const innerQuery = ids
      .filter(id => !existingShows.find(show => Boolean(show && show.ids.id === id)))
      .map(createQuery)
      .join('\r\n')
    if (innerQuery.length > 0) {
      const query = '{' + innerQuery + '}'
      const result = await client<{ [key: string]: Dragonstone.Show | null }>(query)
      const shows = Object.values(result)
      shows.forEach(show => show && storage.showStorage.saveShow(show))
      return Object.values(result).concat(...existingShows)
    } else {
      return existingShows
    }
  },
  async fetchEpisodes(showId: string) {
    const result = await client<{ episodes: Dragonstone.Episode[] }>(`
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
