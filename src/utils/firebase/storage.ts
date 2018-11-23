import { get, set } from 'idb-keyval'
import { Episode, Show } from './types'

const SHOW_PREFIX = 'show'
const EPISODES_TO_WATCH_PREFIX = 'episodes_to_watch'

export const storage = {
  episodesToWatch: {
    set(showId: string, episodes: Episode[]): Promise<void> {
      const obj: StorageObject<Episode[]> = {
        date: new Date(),
        data: episodes
      }
      return set(`${EPISODES_TO_WATCH_PREFIX}_${showId}`, obj)
    },
    get(showId: string): Promise<StorageObject<Episode[]> | undefined> {
      return get(`${EPISODES_TO_WATCH_PREFIX}_${showId}`)
    }
  },
  show: {
    set(show: Show): Promise<void> {
      const showObject: StorageObject<Show> = {
        date: new Date(),
        data: show
      }
      return set(`${SHOW_PREFIX}_${show.id}`, showObject)
    },
    get(showId: string): Promise<StorageObject<Show> | undefined> {
      return get(`${SHOW_PREFIX}_${showId}`)
    }
  }
}

export function isInvalid<T>(
  storageObject: StorageObject<T> | undefined,
  date: Date
): boolean {
  return (
    Boolean(storageObject) && storageObject!.date.getTime() < date.getTime()
  )
}

export type Storage = typeof storage

interface StorageObject<T> {
  date: Date
  data: T
}
