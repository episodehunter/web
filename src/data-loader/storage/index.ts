import { createIdb } from './idb'
import { createShowStorage } from './show.storage'

export const createStorage = () => {
  const idb = createIdb()
  return {
    showStorage: createShowStorage(idb)
  }
}

export type Storage = ReturnType<typeof createStorage>
