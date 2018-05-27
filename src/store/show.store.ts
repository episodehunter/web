import { action } from 'mobx'
import { Show } from './show'

export class ShowStore {
  shows: Map<number, Show> = new Map()

  getShow(id: number): Show {
    const show = this.shows.get(id)
    if (!show) {
      return this.createShow(id)
    } else {
      return show
    }
  }

  @action
  addShow(id: number): Show {
    const show = this.shows.get(id)
    if (!show) {
      return this.createShow(id)
    }
    return show
  }

  @action
  private createShow(id: number) {
    const newShow = new Show(id)
    this.shows.set(id, newShow)
    return newShow
  }
}
