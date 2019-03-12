// import { get, set } from 'idb-keyval';
// import { subDays } from 'date-fns';
// import { now } from '../date.utils';

// const SHOW_PREFIX = 'show'
// const SEASON_PREFIX = 'season'
// const EPISODES_TO_WATCH_PREFIX = 'episodes_to_watch'
// const UPCOMING_EPISODES = 'upcoming_episodes'
// const following_shows = 'folloing_shows'

// const memoryCache = {}

// function setCache<T>(id: string, data: T): Promise<void> {
//   const obj: StorageObject<T> = {
//     date: new Date(),
//     data
//   }
//   memoryCache[id] = obj
//   return set(id, obj)
// }

// async function getCache<T>(id: string): Promise<T> {
//   const cache = memoryCache[id]
//   if (cache) {
//     return cache
//   } else {
//     return get(id)
//   }
// }

// export const storage = {
//   episodesToWatch: {
//     set(showId: string, episodes: Episode[]): Promise<void> {
//       return setCache(`${EPISODES_TO_WATCH_PREFIX}_${showId}`, obj)
//     },
//     get(showId: string): Promise<StorageObject<Episode[]> | undefined> {
//       return getCache(`${EPISODES_TO_WATCH_PREFIX}_${showId}`)
//     }
//   },
//   show: {
//     set(show: Show): Promise<void> {
//       const showObject: StorageObject<Show> = {
//         date: new Date(),
//         data: show
//       }
//       return setCache(`${SHOW_PREFIX}_${show.ids.id}`, showObject)
//     },
//     get(showId: string): Promise<StorageObject<Show> | undefined> {
//       return getCache(`${SHOW_PREFIX}_${showId}`)
//     }
//   },
//   season: {
//     set(showId: string, seasonNumber: number, season: Episode[]): Promise<Episode[]> {
//       const seasonObject: StorageObject<Episode[]> = {
//         date: new Date(),
//         data: season
//       }
//       return setCache(`${SEASON_PREFIX}_${showId}_${seasonNumber}`, seasonObject).then(() => season)
//     },
//     get(showId: string, seasonNumber: number): Promise<StorageObject<Episode[]> | undefined> {
//       return getCache(`${SEASON_PREFIX}_${showId}_${seasonNumber}`)
//     }
//   },
//   watchedSeason: {
//     set(showId: string, seasonNumber: number, season: WatchedEpisode[]): Promise<void> {
//       const seasonObject: StorageObject<WatchedEpisode[]> = {
//         date: new Date(),
//         data: season
//       }
//       return setCache(`${WATCH_SEASON_PREFIX}_${showId}_${seasonNumber}`, seasonObject)
//     },
//     get(showId: string, seasonNumber: number): Promise<StorageObject<WatchedEpisode[]> | undefined> {
//       return getCache(`${WATCH_SEASON_PREFIX}_${showId}_${seasonNumber}`)
//     }
//   },
//   upcomingEpisodes: {
//     set(showId: string, upcomingEpisodes: UpcomingEpisodes): Promise<void> {
//       const storeObject: StorageObject<UpcomingEpisodes> = {
//         date: new Date(),
//         data: upcomingEpisodes
//       }
//       return setCache(`${UPCOMING_EPISODES}_${showId}`, storeObject)
//     },
//     get(showId: string): Promise<StorageObject<UpcomingEpisodes> | undefined> {
//       return getCache(`${UPCOMING_EPISODES}_${showId}`)
//     }
//   },
//   userMetaData: {
//     set(userId: string, userMetaData: UserMetaData): Promise<void> {
//       const storeObject: StorageObject<UserMetaData> = {
//         date: new Date(),
//         data: userMetaData
//       }
//       return setCache(`${USER_META_DATA}_${userId}`, storeObject)
//     },
//     get(userId: string): Promise<StorageObject<UserMetaData> | undefined> {
//       return getCache(`${USER_META_DATA}_${userId}`)
//     }
//   }
// }

// export function isInvalid<T>(
//   storageObject: StorageObject<T> | undefined,
//   expiryDate: Date
// ): boolean {
//   if (!storageObject) {
//     return true
//   }
//   if (storageObject!.date.getTime() < expiryDate.getTime()) {
//     return true
//   }
//   return false
// }

// export const isValidAfter = <T>(storageObject: StorageObject<T> | undefined, nDays: number) => !isInvalid(storageObject, subDays(now(), nDays))

// export type Storage = typeof storage

// export interface StorageObject<T> {
//   date: Date
//   data: T
// }
