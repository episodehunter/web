import { computed, observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { BaseStore } from './base-store'
import { Show } from './show.store'

export class WhatToWatch extends BaseStore {
  @observable data: PublicTypes.WhatToWatch[] = []

  keep(showIds: string[]) {
    this.data = this.data.filter(whatToWatch => showIds.includes(whatToWatch.showId))
    return this.data
  }

  has(showId: string) {
    return this.data.some(upcoming => upcoming.showId === showId)
  }

  add(upcoming: PublicTypes.WhatToWatch) {
    this.data.push(upcoming)
  }

  @computed
  get whatToWatch() {
    const whatToWatch: { show: Show; numberOfEpisodesToWatch: number }[] = []

    this.data.forEach(wtw => {
      const show = this.rootStore.shows.find(wtw.showId)
      if (show) {
        whatToWatch.push({
          show,
          numberOfEpisodesToWatch: wtw.numberOfEpisodesToWatch
        })
      }
    })
    whatToWatch.sort((w1, w2) => {
      return w2.numberOfEpisodesToWatch - w1.numberOfEpisodesToWatch
    })
    return whatToWatch
  }
}
