import { get, set } from 'idb-keyval'
import { ShowResponse } from './api/responses'

const SHOW_PREFIX = 'show'

export const storage = {
  show: {
    set(show: ShowResponse): Promise<ShowResponse> {
      const showObject = {
        date: new Date(),
        data: show
      }
      return set(`${SHOW_PREFIX}_${show.id}`, showObject).then(() => show)
    },
    get(id: number): Promise<StorageObject<ShowResponse>> {
      return get(`${SHOW_PREFIX}_${id}`)
    }
  }
}

interface StorageObject<T> {
  date: Date
  data: T
}
