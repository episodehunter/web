import { action, observable } from 'mobx'
import { tap } from 'rxjs/operators'
import { Request } from '../request'
import { isSameEpisode } from '../utils/episode.util'
import { ModelLoader } from '../utils/model-loader.util'

export class HistoryStore {
  private request: Request
  @observable history = new Map<ShowId, WatchedHistory[]>()
  loader = new ModelLoader<ShowId>()

  constructor(request: Request) {
    this.request = request
    const requestHistoryForShow = (showId: ShowId) => request.history(showId)
    this.loader.register(requestHistoryForShow)(history =>
      this.setHistoryForShow(history)
    )
  }

  getHistoryForShow(showId: number): WatchedHistory[] {
    return this.history.get(showId) || []
  }

  removeEpisode(showId: number, season: number, episode: number) {
    return this.request
      .unwatchEpisode(showId, season, episode)
      .pipe(tap(() => this.removeHistoryForShow(showId, season, episode)))
  }

  addEpisode(showId: number, season: number, episode: number) {
    return this.request
      .checkInEpisode(showId, season, episode)
      .pipe(tap(we => this.addHistoryForShow(we)))
  }

  @action
  addHistoryForShow(we: WatchedHistory) {
    const historyForShow = this.history.get(we.showId)
    if (!historyForShow) {
      this.setHistoryForShow([we])
    } else {
      historyForShow.push(we)
    }
  }

  @action
  removeHistoryForShow(showId: number, season: number, episode: number) {
    const historyForShow = this.history.get(showId)
    if (historyForShow) {
      this.setHistoryForShow(
        historyForShow.filter(
          we =>
            !(we.showId === showId && isSameEpisode({ episode, season }, we))
        )
      )
    }
  }

  @action
  setHistoryForShow(history: WatchedHistory[]): void {
    if (history.length) {
      this.history.set(history[0].showId, history)
    }
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
  type: 'plexScrobble' | 'checkin'
}

type SeasonNumber = number
type ShowId = number
