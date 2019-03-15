import { action, computed, observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { format } from '../utils/date.utils'
import { BaseStore } from './base-store'

export class HistoryPage extends BaseStore {
  @observable history: Map<number, PublicTypes.History[]> = new Map()

  @action
  addHistory(page: number, history: PublicTypes.History[]) {
    this.history.set(page, history)
  }

  @computed
  get groupedHistory() {
    const allHistoryPages: PublicTypes.History[] = Array.prototype.concat.apply(
      [],
      Array.from(this.history.values())
    )
    const historyGroup = new Map<string, PublicTypes.History[]>()
    for (let history of allHistoryPages) {
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
}
