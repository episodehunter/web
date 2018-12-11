import { format, subDays } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { createEpisode, createShow, createWatchedEpisode, Episode, Show, UpcomingEpisodes, WatchedEpisode } from '../../model';
import { getUserId } from '../auth.util';
import * as FirebaseModel from './types';
import { sortEpisodeAfterEpisodenumber } from './util';

type Db = firebase.firestore.Firestore

function initializeDatabase(): Db {
  const db = firebase.firestore()

  // Disable deprecated features
  db.settings({
    timestampsInSnapshots: true
  })
  return db
}

function getGetDatabase() {
  let db: Db
  return () => {
    if (!db) {
      db = initializeDatabase()
    }
    return db
  }
}

const getDatabase = getGetDatabase()

const userDoc = (id: string) =>
  getDatabase()
    .collection('users')
    .doc(id)

const showsWatchHistoryCollection = (userId: string) =>
  userDoc(userId).collection('showsWatchHistory')

const showDoc = (id: string) =>
  getDatabase()
    .collection('shows')
    .doc(id)

const episodesCollection = (showId: string) =>
  showDoc(showId)
    .collection('episodes')

export function getUserMetaData(userId = getUserId()): Promise<FirebaseModel.UserMetaData> {
  return userDoc(userId)
    .get()
    .then(r => {
      if (!r.exists) {
        throw new Error('Meta data does not exist for user with id: ' + userId)
      }
      return r.data() as FirebaseModel.UserMetaData
    })
}

export function getShow(id: string): Promise<Show | null> {
  return showDoc(id)
    .get()
    .then(r => {
      if (!r.exists) {
        console.warn('Show do not exist for for id: ', id)
        return null
      }
      return createShow(r.data() as FirebaseModel.Show)
    })
}

export function getSeason(showId: string, season: number): Promise<Episode[]> {
  return episodesCollection(showId)
    .where('season', '==', season)
    .get()
    .then(r => r.docs.map(d => d.data()) as FirebaseModel.Episode[])
    .then(episodes => episodes.map(createEpisode).sort(sortEpisodeAfterEpisodenumber))
}

export function getWatchSeason(showId: string, season: number, cb: (episodes: WatchedEpisode[]) => void, userId = getUserId()): () => void {
  return showsWatchHistoryCollection(userId)
    .where('season', '==', season)
    .where('showId', '==', Number(showId))
    .onSnapshot(snapshot => {
      const we = snapshot.docs
        .map(d => d.data() as FirebaseModel.WatchedEpisode)
        .map(createWatchedEpisode)
      cb(we)
    })
}

// export function getShowCacheFallbackOnNetwork(
//   id: string
// ): Promise<Show | null> {
//   return storage.show.get(id).then(showCache => {
//     if (isInvalid(showCache, subDays(now(), 3))) {
//       return getShow(id).then(show => {
//         if (show) {
//           return storage.show.set(show).then(() => show)
//         }
//         return Promise.resolve(null)
//       })
//     }
//     return showCache!.data
//   })
// }

export function getEpisodesAfter(showId: string, episodeNumber: number): Promise<Episode[]> {
  return episodesCollection(showId)
    .where('episodeNumber', '>', episodeNumber)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
        .map(d => d.data() as FirebaseModel.Episode)
        .map(createEpisode)
        .sort(sortEpisodeAfterEpisodenumber)
    })
}

export function getUpcommingEpisodes(showId: string, now = new Date()): Promise<UpcomingEpisodes> {
  const threeDaysAgo = subDays(now, 3)
  return episodesCollection(showId)
    .where('aired', '>=', format(threeDaysAgo, 'YYYY-MM-DD'))
    .orderBy('aired')
    .limit(2)
    .get()
    .then(querySnapshot => {
      const upcoming = {
        nextEpisode: null,
        prevEpisode: null
      } as UpcomingEpisodes

      querySnapshot.forEach(doc => {
        if (upcoming.nextEpisode) {
          return
        }
        const episode = doc.data() as FirebaseModel.Episode
        if (episode.aired > format(now, 'YYYY-MM-DD')) {
          upcoming.nextEpisode = createEpisode(episode)
        } else {
          upcoming.nextEpisode = createEpisode(episode)
        }
      })
      return upcoming
    })
}

export function getHighestWatchedEpisodeUpdate(
  showId: string,
  cb: (episode: Episode | null) => void,
  userId = getUserId()
): () => void {
  return showsWatchHistoryCollection(userId)
    .where('showId', '==', Number(showId))
    .orderBy('episodeNumber', 'desc')
    .limit(1)
    .onSnapshot(querySnapshot => {
      if (querySnapshot.size === 0) {
        cb(null)
      } else {
        cb(createEpisode(querySnapshot.docs[0].data() as FirebaseModel.Episode))
      }
    })
}

export function getNextEpisode(
  showId: string,
  episodeNumber: number
): Promise<Episode | null> {
  return episodesCollection(showId)
    .where('episodeNumber', '>', episodeNumber)
    .orderBy('episodeNumber')
    .limit(1)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size === 0) {
        return null
      } else if (querySnapshot.size === 1) {
        return createEpisode(querySnapshot.docs[0].data() as any)
      } else {
        console.warn('Result should be 1 or 0')
        return null
      }
    })
}

export function removeShowIdFromFollowing(uid = getUserId(), showId: string) {
  console.error('Do not write data to firebase');
  return userDoc(uid).update({ following: firebase.firestore.FieldValue.arrayRemove(Number(showId)) })
}

export function addShowIdFromFollowing(uid = getUserId(), showId: string) {
  console.error('Do not write data to firebase');
  return userDoc(uid).update({ following: firebase.firestore.FieldValue.arrayUnion(Number(showId)) })
}

export function watchEpisode(showId: string, season: number, episode: number, uid = getUserId()) {
  console.error('Do not update watch history from the client');
  const wh = {
    episode,
    episodeNumber: season * 10000 + episode,
    season,
    showId: Number(showId),
    time: new Date(),
    type: 0
  }
  console.log(wh)
  return showsWatchHistoryCollection(uid).add(wh)
}

export function unwatchEpisode(showId: string, season: number, episode: number, uid = getUserId()) {
  console.error('Do not update watch history from the client');
  const episodeNumber = season * 10000 + episode
  console.log({episodeNumber, showId: Number(showId)})
  return showsWatchHistoryCollection(uid).where('showId', '==', Number(showId)).where('episodeNumber', '==', episodeNumber).get().then(result => {
    console.log('s', result.size)
    return result.docs.filter(d => d.exists).map(d => d.ref.delete())
  })
}
