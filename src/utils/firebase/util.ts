import { of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Episode } from '../../model';
import { getUserId } from '../auth.util';
import { addShowIdFromFollowing, getUserMetaData, removeShowIdFromFollowing } from './query';
import { followingIdsSubject, userMetaData$ } from './selectors';
import { Show, State } from './types';

export function updateLocalUserMetadata() {
  return getUserMetaData().then(metadata => {
    userMetaData$.next(metadata)
    followingIdsSubject.next(metadata.following)
    return metadata
  })
}

export function unfollowShow(showId: string, userId = getUserId()) {
  return followingIdsSubject.pipe(
    take(1),
    switchMap(ids => {
      if (!ids) {
        return of([])
      }
      if (ids!.includes(Number(showId))) {
        return removeShowIdFromFollowing(userId, showId).then(() => ids.filter(id => id !== Number(showId)))
      }
      return of(ids)
    }),
    tap(ids => followingIdsSubject.next(ids))
  )
}

export function followShow(showId: string, userId = getUserId()) {
  return followingIdsSubject.pipe(
    take(1),
    switchMap(ids => {
      if (!ids) {
        return of([])
      }
      if (!ids!.includes(Number(showId))) {
        return addShowIdFromFollowing(userId, showId).then(() => [...ids, Number(showId)])
      }
      return of(ids)
    }),
    tap(ids => followingIdsSubject.next(ids))
  )
}

export function sortShowsAfterEpisodesAirDate(
  data: { show: Show; episodes: State<Episode[]> }[]
) {
  return data.sort((a, b) => {
    const aIsLoading = a.episodes.status !== 'loaded'
    const bIsLoading = a.episodes.status !== 'loaded'
    if (aIsLoading && bIsLoading) {
      return 0
    } else if (aIsLoading) {
      return 1
    } else if (bIsLoading) {
      return -1
    }

    const aCaughtUp = a.episodes.data!.length === 0
    const bCaughtUp = a.episodes.data!.length === 0
    const aEndedAndCaughtUp = a.show.ended && aCaughtUp
    const bEndedAndCaughtUp = a.show.ended && bCaughtUp
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
      b.episodes.data![b.episodes.data!.length - 1].aired.getTime() -
      a.episodes.data![a.episodes.data!.length - 1].aired.getTime()
    )
  })
}

export function sortEpisodeAfterEpisodenumber(a: Episode, b: Episode) {
  return b.episodeNumber - a.episodeNumber
}
