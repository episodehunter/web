import { get, set } from 'idb-keyval';
import { Episode, Show, UpcomingEpisodes, WatchedEpisode } from '../../model';

const SHOW_PREFIX = 'show'
const SEASON_PREFIX = 'season'
const WATCH_SEASON_PREFIX = 'watch_season'
const EPISODES_TO_WATCH_PREFIX = 'episodes_to_watch'
const UPCOMING_EPISODES = 'upcoming_episodes'

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
      return setCache(`${SHOW_PREFIX}_${show.ids.id}`, showObject)
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
  },
  watchedSeason: {
    set(showId: string, seasonNumber: number, season: WatchedEpisode[]): Promise<void> {
      const seasonObject: StorageObject<WatchedEpisode[]> = {
        date: new Date(),
        data: season
      }
      return setCache(`${WATCH_SEASON_PREFIX}_${showId}_${seasonNumber}`, seasonObject)
    },
    get(showId: string, seasonNumber: number): Promise<StorageObject<WatchedEpisode[]> | undefined> {
      return getCache(`${WATCH_SEASON_PREFIX}_${showId}_${seasonNumber}`)
    }
  },
  upcomingEpisodes: {
    set(showId: string, upcomingEpisodes: UpcomingEpisodes): Promise<void> {
      const storeObject: StorageObject<UpcomingEpisodes> = {
        date: new Date(),
        data: upcomingEpisodes
      }
      return setCache(`${UPCOMING_EPISODES}_${showId}`, storeObject)
    },
    get(showId: string): Promise<StorageObject<UpcomingEpisodes> | undefined> {
      return getCache(`${UPCOMING_EPISODES}_${showId}`)
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

export interface StorageObject<T> {
  date: Date
  data: T
}
