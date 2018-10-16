import { Request } from '../request'
import { ShowId } from '../types'
import { History } from './history'

export class HistoryStore {
  private request: Request
  private history = new Map<ShowId, History>()

  constructor(request: Request) {
    this.request = request
  }

  getHistoryForShow(showId: number): History {
    const history = this.history.get(showId)
    if (history) {
      return history
    } else {
      const newHistory = new History(showId, this.request)
      this.history.set(showId, newHistory)
      return newHistory
    }
  }
}
