import { subDays } from 'date-fns'
import 'firebase/firestore'
import { forkJoin, Observable, ReplaySubject } from 'rxjs'
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators'
import { now } from '../date.utils'
import {
  getEpisodesAfter,
  getHighestWatchedEpisodeUpdate,
  getNextEpisode,
  getShow,
  getShowCacheFallbackOnNetwork,
  getUpcommingEpisodes
} from './query'
import { createLoadedState, createLoadingState } from './state'
import { isInvalid, storage } from './storage'
import {
  Episode,
  Show,
  ShowWithUpcomingEpisodes,
  State,
  UserMetaData
} from './types'

export const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)

export const followingIds$ = userMetaData$.pipe(
  filter(Boolean),
  map((metadata: UserMetaData) => metadata.following)
)

export const followingIds2$ = followingIds$.pipe(
  map(following => createLoadedState(following, 'network')),
  startWith(createLoadingState())
)

const followingShows$ = followingIds$.pipe(
  switchMap(ids =>
    Promise.all(ids.map(id => getShowCacheFallbackOnNetwork(String(id))))
  ),
  map(shows => shows.filter(Boolean) as Show[])
)

export const upcomingEpisodes$ = followingShows$.pipe(
  switchMap(shows => {
    return Promise.all(
      shows.map(async show => {
        const upcomingEpisodes = await getUpcommingEpisodes(show)
        return Object.assign(
          {},
          upcomingEpisodes,
          show
        ) as ShowWithUpcomingEpisodes
      })
    )
  })
)

export const episodesToWatch$ = followingShows$.pipe(
  switchMap(shows =>
    forkJoin(
      shows.map(show =>
        episodesToWatchForShow$(show.id).pipe(
          map(episodes => ({
            show,
            episodes
          }))
        )
      )
    )
  )
)

const episodesToWatchForShowObs: {
  [key: string]: Observable<State<Episode[]>>
} = {}

export function episodesToWatchForShow$(
  showId: string
): Observable<State<Episode[]>> {
  const possibleToWatchFilter = (e: Episode[], h: number) =>
    e.filter(e => e.episodeNumber > h)
  console.log('episodesToWatchForShow$ start')
  if (!episodesToWatchForShowObs[showId]) {
    console.log('we dont have episodesToWatchForShow$ so lets create it')
    episodesToWatchForShowObs[showId] = getHighestWatchedEpisode$(showId).pipe(
      switchMap(episodeState => {
        console.log('we have a hige episode: ', episodeState)
        return Observable.create(async obs => {
          if (episodeState.status !== 'loaded') {
            obs.next(createLoadingState())
            return null
          }
          let highestWatchedEpisode = 0
          if (episodeState.data && episodeState.data.episodeNumber) {
            highestWatchedEpisode = episodeState.data.episodeNumber
          }
          const etwc = await storage.episodesToWatch.get(showId)
          if (etwc && etwc.data) {
            obs.next(
              createLoadedState(
                possibleToWatchFilter(etwc.data, highestWatchedEpisode),
                'cache'
              )
            )
          }

          if (isInvalid(etwc, subDays(now(), 3))) {
            const etw = await getEpisodesAfter(showId, highestWatchedEpisode)
            storage.episodesToWatch.set(showId, etw)
            obs.next(
              createLoadedState(
                possibleToWatchFilter(etw, highestWatchedEpisode),
                'network'
              )
            )
          }
        })
      }),
      shareReplay(1)
    ) as any
  }
  return episodesToWatchForShowObs[showId]
}

const getHighestWatchedEpisodeObs: {
  [key: string]: Observable<State<Episode>>
} = {}

export function getHighestWatchedEpisode$(
  showId: string
): Observable<State<Episode>> {
  if (!getHighestWatchedEpisodeObs[showId]) {
    getHighestWatchedEpisodeObs[showId] = Observable.create(obs => {
      obs.next(createLoadingState())
      const unsubscribe = getHighestWatchedEpisodeUpdate(showId, episode =>
        obs.next(createLoadedState(episode, 'network'))
      )
      return () => unsubscribe()
    }).pipe(shareReplay(1))
  }
  return getHighestWatchedEpisodeObs[showId]
}

export function show$(showId: string): Observable<State<Show>> {
  return Observable.create(async obs => {
    obs.next(createLoadingState())
    const showCache = await storage.show.get(showId)
    if (showCache) {
      obs.next(createLoadedState(showCache.data, 'cache'))
    }
    if (isInvalid(showCache, subDays(now(), 3))) {
      const show = await getShow(showId)
      obs.next(createLoadedState(show, 'network'))
      if (show) {
        storage.show.set(show).catch(error => console.error(error))
      }
    }
  })
}

export function nextEpisodeToWatch$(showId): Observable<State<Episode | null>> {
  return getHighestWatchedEpisode$(showId).pipe(
    switchMap(episode => {
      const createLoadedNetworkState = (d: Episode | null) =>
        createLoadedState(d, 'network')
      if (episode.data) {
        return getNextEpisode(showId, episode.data.episodeNumber).then(
          createLoadedNetworkState
        )
      }
      return getNextEpisode(showId, 0).then(createLoadedNetworkState)
    })
  )
}

// async function show(id) {
//   if (s1) {
//     s1.unsubscribe()
//   }
//   if (s2) {
//     s2.unsubscribe()
//   }
//   const t0 = window.performance.now()
//   const showP = getShow(id)
//   const highestWatchedEpisodes$ = getHighestWatchedEpisodes$(2, id)

//   s1 = highestWatchedEpisodes$
//     .pipe(
//       rxjs.operators.take(1),
//       rxjs.operators.switchMap(episode => {
//         if (episode) {
//           return getSeason({ id }, episode.season)
//         }
//         return getSeason({ id }, 1)
//       })
//     )
//     .subscribe(season => {
//       console.log('season: ', season, window.performance.now() - t0)
//     })

//   s2 = highestWatchedEpisodes$
//     .pipe(
//       rxjs.operators.switchMap(episode => {
//         if (episode) {
//           return getNextEpisode({ id }, episode.episodeNumber)
//         }
//         return getNextEpisode({ id }, 0)
//       })
//     )
//     .subscribe(nextEpisodeToWatch => {
//       console.log(
//         'Next episode to watch: ',
//         nextEpisodeToWatch,
//         window.performance.now() - t0
//       )
//     })

//   showP.then(show => {
//     console.log('show: ', show, window.performance.now() - t0)
//   })
// }

// function watchEpisode(userId, showId, season, episode) {
//   db.collection('users').doc(String(userId)).collection('showsWatchHistory').add({
//     episode,
//     episodeNumber: season * 10000 + episode,
//     season,
//     showId,
//     time: new Date(),
//     type: 1
//   }).then(() => {
//     console.log('Done! Marked episode as watched')
//   })
// }

// function unwatchEpisode(userId, showId, season, episode) {
//   db
//     .collection('users')
//     .doc(String(userId))
//     .collection('showsWatchHistory')
//     .where('season', '==', season)
//     .where('episode', '==', episode)
//     .get()
//     .then(querySnapshot => {
//       const queue = []
//       querySnapshot.forEach(doc => {
//         queue.push(db
//           .collection('users')
//           .doc(String(userId))
//           .collection('showsWatchHistory')
//           .doc(doc.id)
//           .delete())
//       })
//       return Promise.all(queue)
//     })
//     .then(() => {
//       console.log('Done! Marked episode as unwached!')
//     })
// }
