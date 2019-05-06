import { Dragonstone } from '@episodehunter/types'
import { Idb } from './idb'

const showKey = 'SHOW'

export function createShowStorage(idb: Idb) {
  return {
    saveShow(show: Dragonstone.Show): Promise<void> {
      return idb.set(`${showKey}_${show.ids.id}`, idb.createStorageObject(show))
    },
    findShow(showId: string): Promise<Dragonstone.Show | undefined> {
      return idb.get(`${showKey}_${showId}`)
    }
  }
}
