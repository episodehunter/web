import { action } from 'mobx'
import { Show } from './show'

export class ShowStore {
  shows: Map<number, Show> = new Map()

  getShow(id: number) {
    if (!this.shows.has(id)) {
      const newShow = this.createShow(id)
      newShow.load()
      return newShow
    }
    return this.shows.get(id)
  }

  @action
  addShow(id: number) {
    const show = this.shows.get(id)
    if (!show) {
      const newShow = this.createShow(id)
      return newShow.load()
    } else {
      return show.load()
    }
  }

  @action
  createShow(id: number) {
    const newShow = new Show(id)
    this.shows.set(id, newShow)
    return newShow
  }
}
