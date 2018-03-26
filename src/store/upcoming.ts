import { FollowingStore } from './following'
import { yyyymmdd } from '../utils/date.utils'
import { computed } from 'mobx'

export class UpcomingStore {
  following: FollowingStore

  constructor(following: FollowingStore) {
    this.following = following
  }

  @computed
  get shows() {
    return this.following.shows
  }

  @computed
  get isLoading() {
    return this.following.isLoading
  }

  @computed
  get justAired() {
    const fiveDaysAgo = new Date()
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
    return this.shows.filter(
      show => show.previousEpisode.firstAired > yyyymmdd(fiveDaysAgo)
    )
  }

  @computed
  get today() {
    const today = new Date()
    return this.shows.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired === yyyymmdd(today)
    )
  }

  @computed
  get weekAhead() {
    const weekAhead = new Date()
    weekAhead.setDate(weekAhead.getDate() + 7)
    return this.shows.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired <= yyyymmdd(weekAhead)
    )
  }

  @computed
  get upcoming() {
    const weekAhead = new Date()
    weekAhead.setDate(weekAhead.getDate() + 7)
    return this.shows.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired > yyyymmdd(weekAhead)
    )
  }
}
