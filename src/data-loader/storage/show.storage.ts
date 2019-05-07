import { Dragonstone } from '@episodehunter/types'
import { Idb, StorageObject } from './idb'

const showKey = 'SHOW'

export function createShowStorage(idb: Idb) {
  return {
    saveShow(show: Dragonstone.Show): Promise<void> {
      if (!show) {
        console.error('Object is not a valid show')
        return Promise.resolve()
      }
      return idb.set(`${showKey}_${show.ids.id}`, idb.createStorageObject(show))
    },
    findShow(showId: string): Promise<StorageObject<Dragonstone.Show> | undefined> {
      return idb.get(`${showKey}_${showId}`)
    }
  }
}
