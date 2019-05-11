import { action, computed, observable } from 'mobx'
import { Dragonstone } from '@episodehunter/types'
import { format } from '../utils/date.utils'
import { BaseStore } from './base-store'

export class HistoryPageStore extends BaseStore {
  @observable history: Map<number, Dragonstone.History[]> = new Map()

  @action
  addHistory(page: number, history: Dragonstone.History[]) {
    this.history.set(page, history)
  }

  @computed
  get groupedHistory() {
    const historyGroup = new Map<string, Dragonstone.History[]>()
    for (let history of this.allHistoryPages) {
      const dateString = format(history.watchedEpisode.time, 'dddd, MMM D YYYY')
      const existingGroup = historyGroup.get(dateString)
      if (!existingGroup) {
        historyGroup.set(dateString, [history])
      } else {
        existingGroup.push(history)
      }
    }
    return Array.from(historyGroup.entries())
  }

  @computed
  get allHistoryPages() {
    return Array.prototype.concat.apply([], Array.from(this.history.values()))
  }

  @computed
  get hasHistory() {
    return this.allHistoryPages.length > 0
  }
}
