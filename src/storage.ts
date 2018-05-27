import { get, set } from 'idb-keyval'
import { ShowResponse } from './api/responses'
import { ShowRequestType } from './enum/request-type'

const SHOW_PREFIX = 'show'

export const storage = {
  show: {
    set(
      show: ShowResponse,
      requestType: ShowRequestType
    ): Promise<ShowResponse> {
      const showObject: StorageObject<ShowResponse, ShowRequestType> = {
        date: new Date(),
        data: show,
        requestType
      }
      return set(`${SHOW_PREFIX}_${show.id}`, showObject).then(() => show)
    },
    get(id: number): Promise<StorageObject<ShowResponse, ShowRequestType>> {
      return get(`${SHOW_PREFIX}_${id}`)
    }
  }
}

interface StorageObject<T, R> {
  date: Date
  data: T
  requestType: R
}
