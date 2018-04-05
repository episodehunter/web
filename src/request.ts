import { api } from './api/api'
import { storage } from './storage'
import { ShowResponse } from './api/responses'

const oneDayAgo = Date.now() - 1 * 24 * 60 * 60 * 1000

export const request = {
  show: (id: number): Promise<ShowResponse> => {
    const fetchShow = () =>
      api.fetchShow(id).then(show => storage.show.set(show).then(() => show))
    return storage.show.get(id).then(show => {
      if (!show) {
        return fetchShow()
      } else if (show.date.getTime() < oneDayAgo) {
        return fetchShow()
      } else {
        return show.data
      }
    })
  }
}
