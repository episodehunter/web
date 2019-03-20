import { isAfter, isBefore, isSameDay } from 'date-fns'
import { computed, observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { isAfterDaysFrom, isBeforeDaysFrom, isSameDayOrAfter, now } from '../utils/date.utils'
import { BaseStore } from './base-store'
import { Show } from './show'

export class UpcomingEpisodes extends BaseStore {
  @observable upcomingEpisodes: PublicTypes.UpcomingEpisodesWithShowId[] = []

  keep(showIds: string[]) {
    this.upcomingEpisodes = this.upcomingEpisodes.filter(upcoming =>
      showIds.includes(upcoming.showId)
    )
    return this.upcomingEpisodes
  }

  has(showId: string) {
    return this.upcomingEpisodes.some(upcoming => upcoming.showId === showId)
  }

  add(upcoming: PublicTypes.UpcomingEpisodesWithShowId) {
    this.upcomingEpisodes.push(upcoming)
  }

  @computed
  get upcoming() {
    return upcoming(this.upcomingEpisodes, (showId: string) => this.showsStore.find(showId))
  }
}

export interface ShowAndEpisode {
  show: Show
  episode?: PublicTypes.UpcomingEpisode
}

interface Upcoming {
  justAired: ShowAndEpisode[]
  today: ShowAndEpisode[]
  weekAhead: ShowAndEpisode[]
  upcoming: ShowAndEpisode[]
  tba: ShowAndEpisode[]
  ended: ShowAndEpisode[]
}

function upcoming(
  episodesWithShowIds: PublicTypes.UpcomingEpisodesWithShowId[],
  getShow: (id: string) => Show | undefined,
  today = now()
) {
  const upcoming: Upcoming = {
    justAired: [],
    today: [],
    weekAhead: [],
    upcoming: [],
    tba: [],
    ended: []
  }
  const isAfterFiveDaysAgo = isAfterDaysFrom(-5, today)
  const isBeforeAWeekFromNow = isBeforeDaysFrom(7, today)
  for (let episodesWithShowId of episodesWithShowIds) {
    const prevEpisode = findPrevEpisode(episodesWithShowId.episodes, today)
    const nextEpisode = findNextEpisode(episodesWithShowId.episodes, today)

    const show = getShow(episodesWithShowId.showId)

    if (!show) {
      console.warn('Could not found show with id: ', episodesWithShowId.showId)
      continue
    }

    if (prevEpisode && isAfterFiveDaysAgo(new Date(prevEpisode.aired))) {
      upcoming.justAired.push({
        show: show,
        episode: prevEpisode
      })
    }

    if (show.data.ended) {
      upcoming.ended.push({
        show: show
      })
    }

    if (!nextEpisode) {
      upcoming.tba.push({
        show: show
      })
    } else {
      if (isSameDay(today, nextEpisode.aired)) {
        upcoming.today.push({
          show: show,
          episode: nextEpisode
        })
      } else if (isBeforeAWeekFromNow(new Date(nextEpisode.aired))) {
        upcoming.weekAhead.push({
          show: show,
          episode: nextEpisode
        })
      } else {
        upcoming.upcoming.push({
          show: show,
          episode: nextEpisode
        })
      }
    }
  }
  return upcoming
}

function findPrevEpisode(episodes: PublicTypes.UpcomingEpisode[], today: Date) {
  let bestMatch: PublicTypes.UpcomingEpisode | undefined = undefined

  const airdEpisodes = episodes.filter(episode => isBefore(episode.aired, today))

  for (let episode of airdEpisodes) {
    if (!bestMatch) {
      bestMatch = episode
    } else if (isAfter(episode.aired, bestMatch.aired)) {
      bestMatch = episode
    }
  }
  return bestMatch
}

function findNextEpisode(episodes: PublicTypes.UpcomingEpisode[], today: Date) {
  let bestMatch: PublicTypes.UpcomingEpisode | undefined = undefined

  const upcomingEpisodes = episodes.filter(episode =>
    isSameDayOrAfter(new Date(episode.aired), today)
  )

  for (let episode of upcomingEpisodes) {
    if (!bestMatch) {
      bestMatch = episode
    } else if (isBefore(episode.aired, bestMatch.aired)) {
      bestMatch = episode
    }
  }
  return bestMatch
}
