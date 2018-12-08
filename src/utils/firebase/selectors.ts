import { subDays } from 'date-fns';
import 'firebase/firestore';
import { forkJoin, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { now } from '../date.utils';
import { getEpisodesAfter, getHighestWatchedEpisodeUpdate, getNextEpisode, getSeason, getShow, getShowCacheFallbackOnNetwork, getUpcommingEpisodes, getWatchSeason } from './query';
import { createLoadedState, createLoadingState } from './state';
import { isInvalid, storage } from './storage';
import { Episode, Show, ShowWithUpcomingEpisodes, State, UserMetaData, WatchedEpisode } from './types';

export const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)
export const followingIdsSubject = new ReplaySubject<number[] | null>(1)

export const followingIds$ = userMetaData$.pipe(
  filter(Boolean),
  map((metadata: UserMetaData) => metadata.following)
)

export const followingIds2$ = followingIdsSubject.pipe(
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
  if (!episodesToWatchForShowObs[showId]) {
    episodesToWatchForShowObs[showId] = getHighestWatchedEpisode$(showId).pipe(
      switchMap(episodeState => {
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

const nextEpisodeToWatchObs: {
  [key: string]: Observable<State<Episode | null>>
} = {}

export function nextEpisodeToWatch$(showId: string): Observable<State<Episode | null>> {
  if (!nextEpisodeToWatchObs[showId]) {
    nextEpisodeToWatchObs[showId] = getHighestWatchedEpisode$(showId).pipe(
      switchMap(episode => {
        const createLoadedNetworkState = (d: Episode | null) =>
          createLoadedState(d, 'network')
        if (episode.data) {
          return getNextEpisode(showId, episode.data.episodeNumber).then(
            createLoadedNetworkState
          )
        }
        return getNextEpisode(showId, 0).then(createLoadedNetworkState)
      }),
      shareReplay(1)
    )
  }
  return nextEpisodeToWatchObs[showId]
}

export function seasonSubject$(showId: string) {
  const seasonSubject = new Subject<number>()
  const setSeason = (season: number) => seasonSubject.next(season)
  let firstEmit = true
  const currentSeason$: Observable<State<Episode[]>> = seasonSubject.pipe(
    switchMap(season => {
      return Observable.create(async obs => {
        if (firstEmit) {
          obs.next(createLoadingState())
        }
        const seasonCache = await storage.season.get(showId, season)
        if (seasonCache) {
          firstEmit = false
          obs.next(createLoadedState(seasonCache.data, 'cache'))
        }
        if (isInvalid(seasonCache, subDays(now(), 3))) {
          if (!firstEmit) {
            obs.next(createLoadingState())
          }
          const networkSeason = await getSeason(showId, season)
          firstEmit = false
          obs.next(createLoadedState(networkSeason, 'network'))
          if (networkSeason) {
            storage.season.set(showId, season, networkSeason).catch(error => console.error(error))
          }
        }
      })
    })
  )

  return {
    setSeason,
    season$: currentSeason$
  }
}

export function watchedSeasonSubject$(showId: string) {
  const seasonSubject = new Subject<number>()
  const setWatchSeason = (season: number) => seasonSubject.next(season)
  const currentSeason$: Observable<State<WatchedEpisode[]>> = seasonSubject.pipe(
    switchMap(season => {
      return Observable.create(async obs => {
        const seasonCache = await storage.watchedSeason.get(showId, season)
        if (seasonCache) {
          obs.next(createLoadedState(seasonCache.data, 'cache'))
        } else {
          obs.next(createLoadingState())
        }
        const unsubscribe = getWatchSeason(showId, season, episodes => {
          obs.next(createLoadedState(episodes, 'network'))
        })
        return unsubscribe
      })
    })
  )

  return {
    setWatchSeason,
    watchSeason$: currentSeason$
  }
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
