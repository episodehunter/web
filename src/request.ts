import { Observable, Observer } from 'rxjs'
import { ApiClient } from './api/api'
import { ShowResponse, WatchedEpisode } from './api/responses'
import { ShowRequestType } from './enum/request-type'
import { Storage } from './storage'

const oneDayAgo = () => Date.now() - 1 * 24 * 60 * 60 * 1000
const tenMinutesAgo = () => Date.now() - 10 * 60 * 1000

export interface Request {
  show: (id: number, type?: ShowRequestType) => Observable<ShowResponse>
  history: (showId: number) => Observable<WatchedEpisode[]>
  following: () => Observable<number[]>
}

export const createRequestClient = (
  storage: Storage,
  apiClient: ApiClient
): Request => ({
  show: (
    id: number,
    type = ShowRequestType.partial
  ): Observable<ShowResponse> => {
    return Observable.create((observer: Observer<ShowResponse>) => {
      storage.show
        .get(id)
        .then(show => {
          if (show) {
            observer.next(show.data)
          }
          if (
            !show ||
            show.date.getTime() < oneDayAgo() ||
            show.requestType < type
          ) {
            return apiClient
              .fetchShow(id, type)
              .then(show => storage.show.set(show, type))
              .then(show => observer.next(show))
          }
        })
        .then(() => observer.complete())
        .catch(error => observer.error(error))
    })
  },

  history: (showId: number): Observable<WatchedEpisode[]> => {
    return Observable.create((observer: Observer<WatchedEpisode[]>) => {
      storage.episodeHistory
        .get(showId)
        .then(history => {
          if (history) {
            observer.next(history.data)
          }
          if (!history || history.date.getTime() < tenMinutesAgo()) {
            return apiClient
              .fetchShowHistory(showId)
              .then(history => storage.episodeHistory.set(showId, history))
              .then(history => observer.next(history))
          }
        })
        .then(() => observer.complete())
        .catch(error => observer.error(error))
    })
  },

  following: (): Observable<number[]> => {
    return Observable.create((observer: Observer<number[]>) => {
      storage.following
        .get()
        .then(followingShowsId => {
          if (followingShowsId) {
            observer.next(followingShowsId.data)
          }
          if (
            !followingShowsId ||
            followingShowsId.date.getTime() < tenMinutesAgo()
          ) {
            return apiClient
              .fetchFollowing()
              .then(following => storage.following.set(following))
              .then(following => observer.next(following))
          }
        })
        .then(() => observer.complete())
        .catch(error => observer.error(error))
    })
  }
})
