import { Observable, Observer } from 'rxjs'
import { api } from './api/api'
import { ShowResponse } from './api/responses'
import { ShowRequestType } from './enum/request-type'
import { storage } from './storage'

const oneDayAgo = Date.now() - 1 * 24 * 60 * 60 * 1000

export const request = {
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
            show.date.getTime() < oneDayAgo ||
            show.requestType < type
          ) {
            return api
              .fetchShow(id, type)
              .then(show => storage.show.set(show, type))
              .then(show => observer.next(show))
          }
        })
        .then(() => observer.complete())
        .catch(error => observer.error(error))
    })
  }
}

export type Request = typeof request
