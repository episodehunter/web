import { action, observable } from 'mobx'
import { tap } from 'rxjs/operators'
import { Request } from '../request'
import { ShowId, WatchedHistory } from '../types'
import { isSameEpisode } from '../utils/episode.util'
import { ModelLoader, NO_TYPE } from '../utils/model-loader.util'
import { Episode } from './episode'

export class History {
  private showId: ShowId
  private request: Request
  loader = new ModelLoader()

  @observable
  history: WatchedHistory[] = []

  constructor(showId: ShowId, request: Request) {
    this.showId = showId
    this.request = request
    const requestHistoryForShow = () => request.history(showId)
    this.loader.register(requestHistoryForShow)(history =>
      this.setHistoryForShow(history)
    )
  }

  removeEpisode(season: number, episode: number) {
    return this.request
      .unwatchEpisode(this.showId, season, episode)
      .pipe(tap(() => this.removeHistoryForShow(season, episode)))
  }

  addEpisode(season: number, episode: number) {
    return this.request
      .checkInEpisode(this.showId, season, episode)
      .pipe(tap(we => this.addHistoryForShow(we)))
  }

  haveSeenEpisode(episode: Episode) {
    return this.history.some(historyEpisode =>
      isSameEpisode(historyEpisode, episode)
    )
  }

  @action
  addHistoryForShow(we: WatchedHistory) {
    this.history.push(we)
  }

  @action
  removeHistoryForShow(season: number, episode: number) {
    this.setHistoryForShow(
      this.history.filter(we => !isSameEpisode({ episode, season }, we))
    )
  }

  @action
  setHistoryForShow(history: WatchedHistory[]): void {
    this.history = history
  }

  load(): void {
    this.loader.load(NO_TYPE)
  }
}
