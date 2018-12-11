import { subDays } from 'date-fns';
import 'firebase/firestore';
import { defer, forkJoin, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, mergeMap, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Show, ShowAndUpcomingEpisodes, UpcomingEpisodes } from '../../model';
import { now } from '../date.utils';
import { getEpisodesAfter, getHighestWatchedEpisodeUpdate, getNextEpisode, getSeason, getShow, getUpcommingEpisodes, getWatchSeason } from './query';
import { createLoadedState, createLoadingState, LoadedState, LoadingState, State } from './state';
import { isInvalid, storage } from './storage';
import { UserMetaData } from './types';

export const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)
export const followingIdsSubject = new ReplaySubject<string[] | null>(1)

// export const followingIds$ = userMetaData$.pipe(
//   filter(Boolean),
//   map((metadata: UserMetaData) => metadata.following)
// )

function hasLoaded<T>(state: LoadedState<T> | LoadingState): state is LoadedState<T> {
  return state.status === 'loaded'
}

export const followingIds$ = followingIdsSubject.pipe(
  map(following => createLoadedState(following, 'network')),
  startWith(createLoadingState())
)

const followingShows$ = followingIds$.pipe(
  filter(hasLoaded),
  filter(state => Array.isArray(state.data)),
  switchMap(state => forkJoin(...state.data!.map(id => show$(id)))),
  map((shows: Show[]) => shows.filter(Boolean)),
  map(shows => createLoadedState(shows, 'mixed')),
  startWith(createLoadingState())
)

export function getUpcommingEpisodes$(showId: string): Observable<LoadingState | LoadedState<UpcomingEpisodes>> {
  return Observable.create(async obs => {
    const upcomingEpisodesFromStorage = await storage.upcomingEpisodes.get(showId)
    if (upcomingEpisodesFromStorage && upcomingEpisodesFromStorage.data) {
      obs.next(createLoadedState(upcomingEpisodesFromStorage.data, 'cache'))
    }

    if (isInvalid(upcomingEpisodesFromStorage, subDays(now(), 1))) {
      const upcomingEpisodes = await getUpcommingEpisodes(showId)
      storage.upcomingEpisodes.set(showId, upcomingEpisodes)
      obs.next(createLoadedState(upcomingEpisodes, 'network'))
    }
  });
}

export const upcomingEpisodes$: Observable<ShowAndUpcomingEpisodes> = followingShows$.pipe(
  filter(state => state.status === 'loaded'),
  map(state => state.data),
  filter(shows => Array.isArray(shows)),
  switchMap(shows => {
    const ue = shows!.map(show => {
      return getUpcommingEpisodes$(show.ids.id)
        .pipe(
          filter(hasLoaded),
          map(state => state.data),
          map(upcomingEpisodes => ({ show, upcomingEpisodes }) as ShowAndUpcomingEpisodes)
        )
    })
    return forkJoin(...ue);
  })
)

export const episodesToWatch$ = followingShows$.pipe(
  filter(hasLoaded),
  switchMap(shows =>
    forkJoin(shows.map(show =>
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
  const getAndStoreShow = defer(async () => {
    const show = await getShow(showId)
    if (show) {
      storage.show.set(show).catch(error => console.error(error))
    }
    return createLoadedState(show, 'network')
  })

  merge(
    [createLoadingState()],

    defer(() => storage.show.get(showId)).pipe(mergeMap(showCache => {
      const isInvalidShow = isInvalid(showCache, subDays(now(), 3))
      const result: State<Show> = []
      if (showCache) {
        result.push(createLoadedState(showCache.data, 'cache'))
      }
      return [getAndStoreShow(showId) ]
    }))
    defer(async () => {
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
  )
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
