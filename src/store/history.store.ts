import { action, observable } from 'mobx'
import { Request } from '../request'
import { ModelLoader } from '../utils/model-loader.util'

export class HistoryStore {
  @observable history = new Map<ShowId, WatchedHistory[]>()
  loader = new ModelLoader<ShowId>()

  constructor(request: Request) {
    const requestHistoryForShow = (showId: ShowId) => request.history(showId)
    this.loader.register(requestHistoryForShow)(history =>
      this.setHistoryForShow(history)
    )
  }

  getHistoryForShow(showId: number): WatchedHistory[] {
    return this.history.get(showId) || []
  }

  @action
  setHistoryForShow(history: WatchedHistory[]): void {
    this.history.set(history[0].showId, history)
  }

  load(showId: ShowId): void {
    this.loader.load(showId)
  }
}

export type WatchedHistory = {
  showId: ShowId
  season: SeasonNumber
  episode: number
  time: number
  type: 'plexScrobble'
}

type SeasonNumber = number
type ShowId = number
