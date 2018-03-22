// import { computed } from 'mobx'
// import { Show } from './show.store'
// import { yyyymmdd } from '../utils/date.utils'
import { Following } from './following'

export class UpcomingViewStore {
  following: Following

  constructor(following: Following) {
    this.following = following
  }

  // @computed
  // get justAired() {
  //   const fiveDaysAgo = new Date()
  //   fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
  //   return this.following.shows.filter(
  //     show => show.previousEpisode.firstAired > yyyymmdd(fiveDaysAgo)
  //   )
  // }

  // @computed
  // get today() {
  //   const today = new Date()
  //   return this.following.filter(
  //     show =>
  //       show.nextEpisode && show.nextEpisode.firstAired === yyyymmdd(today)
  //   )
  // }

  // @computed
  // get weekAhead() {
  //   const weekAhead = new Date()
  //   weekAhead.setDate(weekAhead.getDate() + 7)
  //   return this.following.filter(
  //     show =>
  //       show.nextEpisode && show.nextEpisode.firstAired <= yyyymmdd(weekAhead)
  //   )
  // }

  // @computed
  // get upcoming() {
  //   const weekAhead = new Date()
  //   weekAhead.setDate(weekAhead.getDate() + 7)
  //   return this.following.filter(
  //     show =>
  //       show.nextEpisode && show.nextEpisode.firstAired > yyyymmdd(weekAhead)
  //   )
  // }
}
