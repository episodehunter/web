import { of } from 'rxjs'
import { switchMap, take, tap } from 'rxjs/operators'
import { Episode, Show } from '../../model'
import { auth } from '../auth.util'
import {
  addShowIdFromFollowing,
  getUserMetaData,
  removeShowIdFromFollowing
} from './query'
import { followingIdsSubject, userMetaData$ } from './selectors'

export function updateLocalUserMetadata() {
  return getUserMetaData().then(metadata => {
    userMetaData$.next(metadata)
    followingIdsSubject.next(metadata.following.map(String))
    return metadata
  })
}

export function unfollowShow(showId: string, userId = auth.getUserId()) {
  return followingIdsSubject.pipe(
    take(1),
    switchMap(ids => {
      if (!ids) {
        return of([])
      }
      if (ids!.includes(showId)) {
        return removeShowIdFromFollowing(userId, showId).then(() =>
          ids.filter(id => id !== showId)
        )
      }
      return of(ids)
    }),
    tap(ids => followingIdsSubject.next(ids))
  )
}

export function followShow(showId: string, userId = auth.getUserId()) {
  return followingIdsSubject.pipe(
    take(1),
    switchMap(ids => {
      if (!ids) {
        return of([])
      }
      if (!ids!.includes(showId)) {
        return addShowIdFromFollowing(userId, showId).then(() => [
          ...ids,
          showId
        ])
      }
      return of(ids)
    }),
    tap(ids => followingIdsSubject.next(ids))
  )
}

export function sortShowsAfterEpisodesAirDate(
  data: { show: Show; episodes: Episode[] }[]
) {
  return data.sort((a, b) => {
    const aCaughtUp = a.episodes.length === 0
    const bCaughtUp = b.episodes.length === 0
    const aEndedAndCaughtUp = a.show.ended && aCaughtUp
    const bEndedAndCaughtUp = b.show.ended && bCaughtUp
    if (aEndedAndCaughtUp && bEndedAndCaughtUp) {
      return 0
    } else if (aEndedAndCaughtUp) {
      return 1
    } else if (bEndedAndCaughtUp) {
      return -1
    } else if (aCaughtUp && bCaughtUp) {
      return 0
    } else if (aCaughtUp) {
      return 1
    } else if (bCaughtUp) {
      return -1
    }
    return (
      b.episodes[b.episodes.length - 1].aired.getTime() -
      a.episodes[a.episodes.length - 1].aired.getTime()
    )
  })
}

export function sortEpisodeAfterEpisodenumber(a: Episode, b: Episode) {
  return a.episodeNumber - b.episodeNumber
}
