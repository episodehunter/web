import { action } from 'mobx'
import { Show } from './show'

export class ShowStore {
  shows: Map<number, Show> = new Map()

  getShow(id: number): Show {
    const show = this.shows.get(id)
    if (!show) {
      return this.createAndLoadShow(id)
    } else {
      return show
    }
  }

  @action
  addShow(id: number): void {
    const show = this.shows.get(id)
    if (!show) {
      this.createAndLoadShow(id)
    } else {
      console.warn('Should not load existing store on add')
      show.load()
    }
  }

  @action
  private createAndLoadShow(id: number) {
    const newShow = new Show(id)
    newShow.load()
    this.shows.set(id, newShow)
    return newShow
  }
}
