import { isSameDay } from 'date-fns'
import { computed } from 'mobx'
import {
  Today,
  isAfterDaysFrom,
  isBeforeDaysFrom,
  today
} from '../utils/date.utils'
import { hasNextEpisode, hasPreviousEpisode } from '../utils/show.util'
import { Following } from './following'
import { Show, ShowWithNextEpisode, ShowWithPreviousEpisode } from './show'

export class UpcomingStore {
  following: Following
  private today: Today

  constructor(following: Following, _today: Today = today) {
    this.following = following
    this.today = _today
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
  get upcoming() {
    const upcoming = {
      justAired: [] as ShowWithPreviousEpisode[],
      today: [] as ShowWithNextEpisode[],
      weekAhead: [] as ShowWithNextEpisode[],
      upcoming: [] as ShowWithNextEpisode[],
      tba: [] as Show[]
    }
    const today = this.today()
    const isAfterFiveDaysAgo = isAfterDaysFrom(-5, today)
    const isBeforeAWeekFromNow = isBeforeDaysFrom(7, today)
    for (let show of this.shows) {
      if (
        hasPreviousEpisode(show) &&
        isAfterFiveDaysAgo(show.previousEpisode.firstAired)
      ) {
        upcoming.justAired.push(show)
      }
      if (show.isAirDateForNextEpisodeDateUnknown) {
        upcoming.tba.push(show)
      }
      if (!hasNextEpisode(show)) {
        continue
      }
      if (isSameDay(today, show.nextEpisode.firstAired)) {
        upcoming.today.push(show)
      } else if (isBeforeAWeekFromNow(show.nextEpisode.firstAired)) {
        upcoming.weekAhead.push(show)
      } else {
        upcoming.upcoming.push(show)
      }
    }
    return upcoming
  }
}
