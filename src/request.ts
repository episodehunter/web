import { get, set } from 'idb-keyval'
import { api } from './api/api'

export const request = {
  show: (id: number) => {
    const fetchingShow = api.fetchShow(id).then(show => {
      return set(id, show).then(() => show)
    })
    return get(id).then(show => show || fetchingShow)
  }
}
