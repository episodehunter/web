import { get, set } from 'idb-keyval';
import { Episode, Show } from './types';

const SHOW_PREFIX = 'show'
const SEASON_PREFIX = 'season'
const EPISODES_TO_WATCH_PREFIX = 'episodes_to_watch'

const memoryCache = {}

function setCache<T>(id: string, data: T): Promise<void> {
  memoryCache[id] = data
  return set(id, data)
}

function getCache<T>(id: string): Promise<T> {
  const cache = memoryCache[id]
  if (cache) {
    return Promise.resolve(cache)
  } else {
    return get(id)
  }
}

export const storage = {
  episodesToWatch: {
    set(showId: string, episodes: Episode[]): Promise<void> {
      const obj: StorageObject<Episode[]> = {
        date: new Date(),
        data: episodes
      }
      return setCache(`${EPISODES_TO_WATCH_PREFIX}_${showId}`, obj)
    },
    get(showId: string): Promise<StorageObject<Episode[]> | undefined> {
      return getCache(`${EPISODES_TO_WATCH_PREFIX}_${showId}`)
    }
  },
  show: {
    set(show: Show): Promise<void> {
      const showObject: StorageObject<Show> = {
        date: new Date(),
        data: show
      }
      return setCache(`${SHOW_PREFIX}_${show.id}`, showObject)
    },
    get(showId: string): Promise<StorageObject<Show> | undefined> {
      return getCache(`${SHOW_PREFIX}_${showId}`)
    }
  },
  season: {
    set(showId: string, seasonNumber: number, season: Episode[]): Promise<void> {
      const seasonObject: StorageObject<Episode[]> = {
        date: new Date(),
        data: season
      }
      return setCache(`${SEASON_PREFIX}_${showId}_${seasonNumber}`, seasonObject)
    },
    get(showId: string, seasonNumber: number): Promise<StorageObject<Episode[]> | undefined> {
      return getCache(`${SEASON_PREFIX}_${showId}_${seasonNumber}`)
    }
  }
}

export function isInvalid<T>(
  storageObject: StorageObject<T> | undefined,
  expiryDate: Date
): boolean {
  if (!storageObject) {
    return true
  }
  if (storageObject!.date.getTime() < expiryDate.getTime()) {
    return true
  }
  return false
}

export type Storage = typeof storage

interface StorageObject<T> {
  date: Date
  data: T
}
