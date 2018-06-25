import { get, set } from 'idb-keyval'
import { ShowResponse, TitlesResponse } from './api/responses'
import { ShowRequestType } from './enum/request-type'

const SHOW_PREFIX = 'show'

export const storage = {
  show: {
    set(
      show: ShowResponse,
      requestType: ShowRequestType
    ): Promise<ShowResponse> {
      const showObject: ShowStorageObject<ShowResponse, ShowRequestType> = {
        date: new Date(),
        data: show,
        requestType
      }
      return set(`${SHOW_PREFIX}_${show.id}`, showObject).then(() => show)
    },
    get(id: number): Promise<ShowStorageObject<ShowResponse, ShowRequestType>> {
      return get(`${SHOW_PREFIX}_${id}`)
    }
  },
  titles: {
    set(titles: TitlesResponse): Promise<TitlesResponse> {
      const titlesObject: TitlesStorageObject<TitlesResponse> = {
        date: new Date(),
        data: titles
      }
      return set('titles', titlesObject).then(() => titles)
    },
    get(): Promise<TitlesStorageObject<TitlesResponse>> {
      return get('titles')
    }
  }
}

interface ShowStorageObject<T, R> {
  date: Date
  data: T
  requestType: R
}

export interface TitlesStorageObject<T> {
  date: Date
  data: T
}
