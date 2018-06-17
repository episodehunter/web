import { get, set } from 'idb-keyval'
import { ShowResponse, WatchedEpisode } from './api/responses'
import { ShowRequestType } from './enum/request-type'

const SHOW_PREFIX = 'show'
const SHOW_HISTORY = 'show_history'
const FOLLOWING_SHOWS = 'following_shows'

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
  },

  episodeHistory: {
    set(
      showId: number,
      episodeHistory: WatchedEpisode[]
    ): Promise<WatchedEpisode[]> {
      const historyObject: StorageObject<WatchedEpisode[], undefined> = {
        date: new Date(),
        data: episodeHistory,
        requestType: undefined
      }
      return set(`${SHOW_HISTORY}_${showId}`, historyObject).then(
        () => episodeHistory
      )
    },
    get(showId: number): Promise<StorageObject<WatchedEpisode[], undefined>> {
      return get(`${SHOW_HISTORY}_${showId}`)
    }
  },

  following: {
    set(followingShowsId: number[]): Promise<number[]> {
      const followingShowsObject: StorageObject<number[], undefined> = {
        date: new Date(),
        data: followingShowsId,
        requestType: undefined
      }
      return set(FOLLOWING_SHOWS, followingShowsObject).then(
        () => followingShowsId
      )
    },
    get(): Promise<StorageObject<number[], undefined>> {
      return get(FOLLOWING_SHOWS)
    }
  }
}

export type Storage = typeof storage

interface StorageObject<T, R> {
  date: Date
  data: T
  requestType: R
}
