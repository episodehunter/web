// import { format, parse, subDays } from 'date-fns'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import { ReplaySubject, Observable } from 'rxjs'
// import { filter, map, switchMap } from 'rxjs/operators'
// import { getUser } from './auth.util'
// import { now } from './date.utils'
// import { storage, isInvalid } from '../storage';

// type Db = firebase.firestore.Firestore

// type UserMetaData = {
//   following: FollowingId[]
// }

// type Show = {
//   id: string
//   ids: {
//     tvdb: number
//     imdb?: string
//   }
//   name: string
//   ended: boolean
// }

// export type Episode = {
//   aired: Date
//   episodeNumber: number
// }

// type FbEpisode = {
//   aired: string
//   episodeNumber: number
// }

// type UpcomingEpisodes = {
//   nextEpisode: Episode | null
//   prevEpisode: Episode | null
// }

// export type ShowWithUpcomingEpisodes = Show & UpcomingEpisodes

// export type ShowWithEpisodesToWatch = Show & { episodesToWatch: Episode[] }

// type FollowingId = number

// type CacheObj<T> = {
//   time: number
//   data: T
// }

// const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)
// export const followingIds$ = userMetaData$.pipe(
//   filter(Boolean),
//   map((metadata: UserMetaData) => metadata.following)
// )

// function initializeDatabase(): Db {
//   const db = firebase.firestore()

//   // Disable deprecated features
//   db.settings({
//     timestampsInSnapshots: true
//   })
//   return db
// }

// function getGetDatabase() {
//   let db: Db
//   return () => {
//     if (!db) {
//       db = initializeDatabase()
//     }
//     return db
//   }
// }

// const getDatabase = getGetDatabase()

// const userDoc = (id: string) =>
//   getDatabase()
//     .collection('users')
//     .doc(id)
// const showsWatchHistoryCollection = (userId: string) =>
//   userDoc(userId).collection('showsWatchHistory')
// const showDoc = (id: string) =>
//   getDatabase()
//     .collection('shows')
//     .doc(id)
// const episodesCollection = (showId: string) =>
//   getDatabase()
//     .collection('shows')
//     .doc(showId)
//     .collection('episodes')

// export function getUserMetaData(user = getUser()): Promise<UserMetaData> {
//   if (!user) {
//     throw new Error('You must sign in') // Todo. Create an error class
//   }
//   return userDoc(user.uid)
//     .get()
//     .then(r => {
//       if (!r.exists) {
//         throw new Error('Meta data does not exist') // TODO: Create an error class
//       }
//       return r.data() as UserMetaData
//     })
//     .then(metaData => {
//       userMetaData$.next(metaData)
//       return metaData
//     })
// }

// function getShowFromFb(id: string) {
//   return showDoc(id)
//     .get()
//     .then(r => {
//       if (!r.exists) {
//         console.warn('Show do not exist for for id: ', id)
//         return null
//       }
//       const show = r.data()
//       show!.id = id
//       return show as Show
//     })
// }

// function getShow(id: string) {
//   return Observable.create(obs => {
//     storage.show.get(id).then(showCache => {
//       if (showCache) {
//         obs.next(showCache)
//       }
//       if (isInvalid(showCache, subDays(now(), 3))) {
//         getShowFromFb(id).then(show => {
//           if (show) {
//             storage.show.set(show, 0)
//           }
//         })
//       }
//     })
//   })
//   storage.show.get(id).then(showCache => {
//     if (isInvalid(showCache, subDays(now(), 3))) {

//     }
//   })
//   return showDoc(id)
//     .get()
//     .then(r => {
//       if (!r.exists) {
//         console.warn('Show do not exist for for id: ', id)
//         return null
//       }
//       const show = r.data()
//       show!.id = id
//       return show as Show
//     })
// }

// function getHighestWatchedEpisode(
//   userId: string,
//   showId: string
// ): Promise<Episode | null> {
//   return showsWatchHistoryCollection(userId)
//     .where('showId', '==', Number(showId))
//     .orderBy('episodeNumber', 'desc')
//     .limit(1)
//     .get()
//     .then(querySnapshot => {
//       let episode: FbEpisode = null as any
//       querySnapshot.forEach(doc => {
//         episode = doc.data() as FbEpisode
//       })
//       if (episode) {
//         return Object.assign(episode, { aired: parse(episode.aired) })
//       }
//       return null
//     })
// }

// function getEpisodesAfter(showId: string, episodeNumber: number) {
//   return episodesCollection(showId)
//     .where('episodeNumber', '>', episodeNumber)
//     .get()
//     .then(querySnapshot => {
//       const episodes: Episode[] = []
//       querySnapshot.forEach(doc => {
//         const episode = doc.data() as FbEpisode
//         episodes.push(Object.assign(episode, { aired: parse(episode.aired) }))
//       })
//       return episodes.sort((a, b) => a.aired.getTime() - b.aired.getTime())
//     })
// }

// const upcomingEpisodesCache = new WeakMap<Show, CacheObj<UpcomingEpisodes>>()

// function getUpcommingEpisodes(show: Show, now = new Date()) {
//   if (show.ended) {
//     return Promise.resolve({
//       nextEpisode: null,
//       prevEpisode: null
//     })
//   }
//   const episodesCache = upcomingEpisodesCache.get(show)
//   if (
//     episodesCache &&
//     episodesCache.time + 24 * 60 * 60 * 1000 > now.getTime()
//   ) {
//     return Promise.resolve(episodesCache.data)
//   }

//   const threeDaysAgo = subDays(now, 3)
//   return episodesCollection(show.id)
//     .where('aired', '>=', format(threeDaysAgo, 'YYYY-MM-DD'))
//     .orderBy('aired')
//     .limit(2)
//     .get()
//     .then(querySnapshot => {
//       const episodes = {
//         nextEpisode: null,
//         prevEpisode: null
//       } as UpcomingEpisodes

//       querySnapshot.forEach(doc => {
//         if (episodes.nextEpisode) {
//           return
//         }
//         const episode = doc.data() as FbEpisode
//         if (episode.aired > format(now, 'YYYY-MM-DD')) {
//           episodes.nextEpisode = Object.assign(episode, {
//             aired: parse(episode.aired)
//           })
//         } else {
//           episodes.nextEpisode = Object.assign(episode, {
//             aired: parse(episode.aired)
//           })
//         }
//       })
//       upcomingEpisodesCache.set(show, {
//         time: now.getTime(),
//         data: episodes
//       })
//       return episodes
//     })
// }

// const followingShows$ = followingIds$.pipe(
//   switchMap(ids => Promise.all(ids.map(id => getShow(String(id))))),
//   map(shows => shows.filter(Boolean) as Show[])
// )

// export const upcomingEpisodes$ = followingShows$.pipe(
//   switchMap(shows => {
//     return Promise.all(
//       shows.map(async show => {
//         const upcomingEpisodes = await getUpcommingEpisodes(show)
//         return Object.assign(
//           {},
//           upcomingEpisodes,
//           show
//         ) as ShowWithUpcomingEpisodes
//       })
//     )
//   })
// )

// export const episodesToWatch$ = followingShows$.pipe(
//   switchMap(shows => {
//     const toDay = now()
//     const userId = getUser()!.uid
//     return Promise.all(
//       shows.map(async show => {
//         const highestWatchedEpisode = await getHighestWatchedEpisode(
//           userId,
//           show.id
//         )
//         let episodeNumber = 0
//         if (highestWatchedEpisode) {
//           episodeNumber = highestWatchedEpisode.episodeNumber
//         }
//         const episodesToWatch = await getEpisodesAfter(show.id, episodeNumber)
//         return Object.assign(
//           { episodesToWatch: episodesToWatch.filter(e => e.aired <= toDay) },
//           show
//         ) as ShowWithEpisodesToWatch
//       })
//     )
//   })
// )
