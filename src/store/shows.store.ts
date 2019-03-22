import { observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { BaseStore } from './base-store'
import { Show } from './show'

export class Shows extends BaseStore {
  @observable shows: Show[] = []

  has(showId: string) {
    return this.shows.some(show => show.data.ids.id === showId)
  }

  add(show: PublicTypes.Show | null) {
    if (!show) {
      return
    }
    const s = new Show(this.rootStore)
    s.data = show
    this.shows.push(s)
  }

  find(showId: string) {
    return this.shows.find(s => s.data.ids.id === showId)
  }
}
