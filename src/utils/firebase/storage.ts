import { get, set } from 'idb-keyval'
import { Show } from './types'

const SHOW_PREFIX = 'show'

export const storage = {
  show: {
    set(show: Show): Promise<void> {
      const showObject: StorageObject<Show> = {
        date: new Date(),
        data: show
      }
      return set(`${SHOW_PREFIX}_${show.id}`, showObject)
    },
    get(showId: string): Promise<StorageObject<Show>> {
      return get(`${SHOW_PREFIX}_${showId}`)
    }
  }
}

export function isInvalid<T>(
  storageObject: StorageObject<T>,
  date: Date
): boolean {
  return Boolean(storageObject) && storageObject.date.getTime() < date.getTime()
}

export type Storage = typeof storage

interface StorageObject<T> {
  date: Date
  data: T
}
