import { computed, observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { BaseStore } from './base-store'
import { Show } from './show'

export class WhatToWatchStore extends BaseStore {
  @observable following: PublicTypes.WhatToWatch[] = []

  keep(showIds: string[]) {
    this.following = this.following.filter(whatToWatch => showIds.includes(whatToWatch.showId))
    return this.following
  }

  has(showId: string) {
    return this.following.some(upcoming => upcoming.showId === showId)
  }

  add(upcoming: PublicTypes.WhatToWatch) {
    this.following.push(upcoming)
  }

  @computed
  get whatToWatch() {
    const whatToWatch: { show: Show; numberOfEpisodesToWatch: number }[] = []

    this.following.forEach(wtw => {
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

  @computed
  get hasSomethingToWatch() {
    return this.following.length > 0
  }
}
