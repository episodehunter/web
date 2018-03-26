import { request } from '../request'
import { ShowResponse } from '../api/responses'
import { ShowStore } from './show'

export class ShowsStore {
  shows: Map<number, ShowStore> = new Map()

  getShow(id: number) {
    const fetchingShow = request.show(id).then((showResponse: ShowResponse) => {
      const show = ShowStore.createFromResponse(showResponse)
      this.shows.set(id, show)
      return show
    })
    if (this.shows.has(id)) {
      return Promise.resolve(this.shows.get(id))
    }
    return fetchingShow
  }
}
