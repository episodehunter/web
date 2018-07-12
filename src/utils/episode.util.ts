import closestIndexTo from 'date-fns/closest_index_to'
import { Episode, EpisodeWithAirDate } from '../store/episode'
import { today } from './date.utils'
import { composeNull } from './function.util'

function hasAird(episode: Episode): episode is EpisodeWithAirDate {
  return episode.hasAird
}

function willAirInTheFuture(episode: Episode): episode is EpisodeWithAirDate {
  return episode.willAirInTheFuture
}

function filterOutUnairdEpisodes(episodes: Episode[]) {
  return episodes.filter(willAirInTheFuture)
}

function filterOutAirdEpisodes(episodes: Episode[]) {
  return episodes.filter(hasAird)
}

function findEpisodeByAirDateClosestTo(date: Date) {
  return (episodes: EpisodeWithAirDate[]): EpisodeWithAirDate | null => {
    return (
      episodes[closestIndexTo(date, episodes.map(e => e.firstAired))] || null
    )
  }
}

export function nextEpisode(episodes: Episode[] | null = null, _today = today) {
  return composeNull(
    findEpisodeByAirDateClosestTo(_today()),
    filterOutUnairdEpisodes
  )(episodes)
}

export function previousEpisode(
  episodes: Episode[] | null = null,
  _today = today
) {
  return composeNull(
    findEpisodeByAirDateClosestTo(_today()),
    filterOutAirdEpisodes
  )(episodes)
}

export function isSameEpisode(
  a: { episode: number; season: number },
  b: { episode: number; season: number }
) {
  return a.episode === b.episode && a.season === b.season
}

export function isHigherEpisode(
  a: { episode: number; season: number },
  b: { episode: number; season: number }
) {
  if (a.season < b.season) {
    return false
  } else if (a.season > b.season) {
    return true
  } else {
    return a.episode > b.episode
  }
}

export function numberOfUnwatchedHoursLeft(
  numberOfEpisodes: number,
  numberOfWatchedEpisodes: number,
  runtime = 60
) {
  return Math.round(
    ((numberOfEpisodes - numberOfWatchedEpisodes) * runtime) / 60
  )
}

export function numberOfEpisodesToWatchPercent(
  totalNumberOfEpisodes: number,
  numberOfWatchedEpisodes: number
) {
  if (totalNumberOfEpisodes === 0) {
    return 0
  }
  return Math.round((numberOfWatchedEpisodes * 100) / totalNumberOfEpisodes)
}
