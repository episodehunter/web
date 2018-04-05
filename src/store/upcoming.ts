import { Following } from './following'
import { yyyymmdd } from '../utils/date.utils'
import { computed } from 'mobx'

export class UpcomingStore {
  following: Following

  constructor(following: Following) {
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
    const fiveDaysAgoDate = new Date()
    fiveDaysAgoDate.setDate(fiveDaysAgoDate.getDate() - 5)
    const fiveDaysAgo = yyyymmdd(fiveDaysAgoDate)
    return this.shows.filter(
      show =>
        show.previousEpisode && show.previousEpisode.firstAired > fiveDaysAgo
    )
  }

  @computed
  get today() {
    const today = yyyymmdd(new Date())
    return this.shows.filter(
      show => show.nextEpisode && show.nextEpisode.firstAired === today
    )
  }

  @computed
  get weekAhead() {
    const weekAheadDate = new Date()
    weekAheadDate.setDate(weekAheadDate.getDate() + 7)
    const weekAhead = yyyymmdd(weekAheadDate)
    return this.shows.filter(
      show => show.nextEpisode && show.nextEpisode.firstAired <= weekAhead
    )
  }

  @computed
  get upcoming() {
    const weekAheadDate = new Date()
    weekAheadDate.setDate(weekAheadDate.getDate() + 7)
    const weekAhead = yyyymmdd(weekAheadDate)
    return this.shows.filter(
      show => show.nextEpisode && show.nextEpisode.firstAired > weekAhead
    )
  }

  @computed
  get tba() {
    return this.shows.filter(show => show.isAirDateForNextEpisodeDateUnknown)
  }
}
