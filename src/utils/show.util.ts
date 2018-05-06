import {
  Show,
  ShowWithNextEpisode,
  ShowWithPreviousEpisode
} from '../store/show'

export function hasPreviousEpisode(
  show: Show
): show is ShowWithPreviousEpisode {
  return Boolean(show.previousEpisode)
}

export function hasNextEpisode(show: Show): show is ShowWithNextEpisode {
  return Boolean(show.nextEpisode)
}
