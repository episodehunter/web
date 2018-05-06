import { Observable, Observer } from 'rxjs'
import { api } from './api/api'
import { storage } from './storage'
import { ShowResponse } from './api/responses'

const oneDayAgo = Date.now() - 1 * 24 * 60 * 60 * 1000

export const request = {
  show: (id: number): Observable<ShowResponse> => {
    return Observable.create((observer: Observer<ShowResponse>) => {
      storage.show
        .get(id)
        .then(show => {
          if (show) {
            observer.next(show.data)
          }
          if (!show || show.date.getTime() < oneDayAgo) {
            return api
              .fetchShow(id)
              .then(storage.show.set)
              .then(show => observer.next(show))
          }
        })
        .then(() => observer.complete())
        .catch(error => observer.error(error))
    })
  }
}

export type Request = typeof request
