import 'firebase/firestore'
import {
  defer,
  forkJoin,
  Observable,
  ObservableInput,
  of,
  ReplaySubject,
  Subject
} from 'rxjs'
import { filter, map, shareReplay, switchMap } from 'rxjs/operators'
import {
  Episode,
  Show,
  ShowAndUpcomingEpisodes,
  UpcomingEpisodes,
  WatchedEpisode
} from '../../model'
import {
  getEpisodesAfter,
  getHighestWatchedEpisodeUpdate,
  getNextEpisode,
  getSeason,
  getShow,
  getUpcommingEpisodes,
  getWatchSeason
} from './query'
import { UserMetaData } from './types'

export const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)
export const followingIdsSubject = new ReplaySubject<string[]>(1)

export const followingIds$ = followingIdsSubject

const followingShows$ = followingIds$.pipe(
  filter(Boolean), // If no network and no chache
  switchMap(ids => safeForkJoin(...ids.map(id => show$(id)))),
  map((shows: Show[]) => shows.filter(Boolean)) // For shows that we dont find
)

export function getUpcommingEpisodes$(
  showId: string
): Observable<UpcomingEpisodes> {
  return defer(() => getUpcommingEpisodes(showId))
}

export const upcomingEpisodes$: Observable<
  ShowAndUpcomingEpisodes[]
> = followingShows$.pipe(
  switchMap(shows => {
    const ue = shows!.map(show => {
      return getUpcommingEpisodes$(show.ids.id).pipe(
        map(
          upcomingEpisodes =>
            ({ show, upcomingEpisodes } as ShowAndUpcomingEpisodes)
        )
      )
    })
    return safeForkJoin(...ue)
  })
)

export const episodesToWatch$ = followingShows$.pipe(
  switchMap(shows =>
    safeForkJoin(
      shows.map(show =>
        episodesToWatchForShow$(show.ids.id).pipe(
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
  [key: string]: Observable<Episode[]>
} = {}

export function episodesToWatchForShow$(showId: string): Observable<Episode[]> {
  const possibleToWatchFilter = (e: Episode[], h: number) =>
    e.filter(e => e.episodeNumber > h)

  if (!episodesToWatchForShowObs[showId]) {
    episodesToWatchForShowObs[showId] = getHighestWatchedEpisode$(showId).pipe(
      switchMap(episode => {
        let highestWatchedEpisode = 0
        if (episode && episode.episodeNumber) {
          highestWatchedEpisode = episode.episodeNumber
        }

        return getEpisodesAfter(showId, highestWatchedEpisode).then(etw =>
          possibleToWatchFilter(etw, highestWatchedEpisode)
        )
      }),
      shareReplay(1)
    ) as any
  }
  return episodesToWatchForShowObs[showId]
}

const getHighestWatchedEpisodeObs: {
  [key: string]: Observable<Episode>
} = {}

export function getHighestWatchedEpisode$(showId: string): Observable<Episode> {
  if (!getHighestWatchedEpisodeObs[showId]) {
    getHighestWatchedEpisodeObs[showId] = Observable.create(obs => {
      const unsubscribe = getHighestWatchedEpisodeUpdate(showId, episode =>
        obs.next(episode)
      )
      return () => unsubscribe()
    }).pipe(shareReplay(1))
  }
  return getHighestWatchedEpisodeObs[showId]
}

export function show$(showId: string): Observable<Show | null> {
  return defer(() => getShow(showId))
}

const nextEpisodeToWatchObs: {
  [key: string]: Observable<Episode | null>
} = {}

export function nextEpisodeToWatch$(
  showId: string
): Observable<Episode | null> {
  if (!nextEpisodeToWatchObs[showId]) {
    nextEpisodeToWatchObs[showId] = getHighestWatchedEpisode$(showId).pipe(
      switchMap(episode => {
        if (episode && episode.episodeNumber) {
          return getNextEpisode(showId, episode.episodeNumber)
        }
        return getNextEpisode(showId, 0)
      }),
      shareReplay(1)
    )
  }
  return nextEpisodeToWatchObs[showId]
}

export function seasonSubject$(showId: string) {
  const seasonSubject = new Subject<number>()
  const setSeason = (season: number) => seasonSubject.next(season)
  const currentSeason$: Observable<Episode[]> = seasonSubject.pipe(
    switchMap(season => getSeason(showId, season))
  )

  return {
    setSeason,
    season$: currentSeason$
  }
}

export function watchedSeasonSubject$(showId: string) {
  const seasonSubject = new Subject<number>()
  const setWatchSeason = (season: number) => seasonSubject.next(season)
  const currentSeason$: Observable<WatchedEpisode[]> = seasonSubject.pipe(
    switchMap(season => {
      return Observable.create(async obs => {
        const unsubscribe = getWatchSeason(showId, season, episodes => {
          obs.next(episodes)
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

function safeForkJoin(
  ...args: Array<ObservableInput<any> | Function>
): Observable<any> {
  if (args.length === 0) {
    return of([])
  }
  return forkJoin(...args)
}
