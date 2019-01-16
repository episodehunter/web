import { format, subDays } from 'date-fns'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {
  createEpisode,
  createShow,
  createWatchedEpisode,
  Episode,
  Show,
  UpcomingEpisodes,
  WatchedEpisode
} from '../../model'
import { auth } from '../auth.util'
import { isValidAfter, storage } from './storage'
import * as FirebaseModel from './types'
import { sortEpisodeAfterEpisodenumber } from './util'

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
    .doc(String(id))

const showsWatchHistoryCollection = (userId: string) =>
  userDoc(userId).collection('showsWatchHistory')

const showDoc = (id: string) =>
  getDatabase()
    .collection('shows')
    .doc(String(id))

const episodesCollection = (showId: string) =>
  showDoc(String(showId)).collection('episodes')

function emitAfter<T>(data: T, time = 2000): Promise<T> {
  return new Promise(r => setTimeout(r, time, data))
}

function handleOffline<T>(backupdata: T): (error: Error) => T {
  return error => {
    console.error(error)
    return backupdata
  }
}

export async function getUserMetaData(
  userId = auth.getUserId()
): Promise<FirebaseModel.UserMetaData> {
  console.log('getUserMetaData')
  const gettingMetaDataFromNetwork = userDoc(userId)
    .get()
    .then(r => r.data() as FirebaseModel.UserMetaData)
    .then(data => storage.userMetaData.set(userId, data).then(() => data))

  const metaDataFromStoreage = await storage.userMetaData.get(userId)
  if (metaDataFromStoreage) {
    return Promise.race([
      gettingMetaDataFromNetwork.catch(
        handleOffline(metaDataFromStoreage.data)
      ),
      emitAfter(metaDataFromStoreage.data)
    ])
  }
  return gettingMetaDataFromNetwork
}

export async function getShow(id: string): Promise<Show | null> {
  console.log('getShow', id)
  const gettingShowFromNetwork = showDoc(id)
    .get()
    .then(r => {
      if (!r.exists) {
        console.warn('Show do not exist for for id: ', id)
        return null
      }
      return createShow(r.data() as FirebaseModel.Show)
    })
    .then(show => {
      if (show) {
        storage.show.set(show)
      }
      return show
    })

  const gettingShowFromStoreage = await storage.show.get(id)
  if (isValidAfter(gettingShowFromStoreage, 3)) {
    return Promise.resolve(gettingShowFromStoreage!.data)
  } else if (gettingShowFromStoreage) {
    return Promise.race([
      gettingShowFromNetwork.catch(handleOffline(gettingShowFromStoreage.data)),
      emitAfter(gettingShowFromStoreage.data)
    ])
  } else {
    return gettingShowFromNetwork
  }
}

export async function getSeason(
  showId: string,
  season: number
): Promise<Episode[]> {
  console.log('getSeason', { showId, season })
  const gettingFromNetwork = episodesCollection(showId)
    .where('season', '==', season)
    .get()
    .then(r => r.docs.map(d => d.data()) as FirebaseModel.Episode[])
    .then(episodes =>
      episodes.map(createEpisode).sort(sortEpisodeAfterEpisodenumber)
    )
    .then(episodes => storage.season.set(showId, season, episodes))

  const gettingFromStoreage = await storage.season.get(showId, season)
  if (isValidAfter(gettingFromStoreage, 3)) {
    return Promise.resolve(gettingFromStoreage!.data)
  } else if (gettingFromStoreage) {
    return Promise.race([
      gettingFromNetwork.catch(handleOffline(gettingFromStoreage.data)),
      emitAfter(gettingFromStoreage.data)
    ])
  } else {
    return gettingFromNetwork
  }
}

export function getWatchSeason(
  showId: string,
  season: number,
  cb: (episodes: WatchedEpisode[]) => void,
  userId = auth.getUserId()
): () => void {
  console.log('getWatchSeason', { showId, season })
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

export function getEpisodesAfter(
  showId: string,
  episodeNumber: number
): Promise<Episode[]> {
  console.log('getEpisodesAfter', { showId, episodeNumber })
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

export function getUpcommingEpisodes(
  showId: string,
  now = new Date()
): Promise<UpcomingEpisodes> {
  console.log('getUpcommingEpisodes', { showId })
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
  cb: (episode: WatchedEpisode | null) => void,
  userId = auth.getUserId()
): () => void {
  console.log('getHighestWatchedEpisodeUpdate', { showId })
  return showsWatchHistoryCollection(userId)
    .where('showId', '==', Number(showId))
    .orderBy('episodeNumber', 'desc')
    .limit(1)
    .onSnapshot(querySnapshot => {
      if (querySnapshot.size === 0) {
        cb(null)
      } else {
        cb(
          createWatchedEpisode(
            querySnapshot.docs[0].data() as FirebaseModel.WatchedEpisode
          )
        )
      }
    })
}

export function getNextEpisode(
  showId: string,
  episodeNumber: number
): Promise<Episode | null> {
  console.log('getNextEpisode', { showId, episodeNumber })
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

export function removeShowIdFromFollowing(
  uid = auth.getUserId(),
  showId: string
) {
  console.error('Do not write data to firebase')
  return userDoc(uid).update({
    following: firebase.firestore.FieldValue.arrayRemove(Number(showId))
  })
}

export function addShowIdFromFollowing(uid = auth.getUserId(), showId: string) {
  console.error('Do not write data to firebase')
  return userDoc(uid).update({
    following: firebase.firestore.FieldValue.arrayUnion(Number(showId))
  })
}

export function watchEpisode(
  showId: string,
  season: number,
  episode: number,
  uid = auth.getUserId()
) {
  console.error('Do not update watch history from the client')
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

export function unwatchEpisode(
  showId: string,
  season: number,
  episode: number,
  uid = auth.getUserId()
) {
  console.error('Do not update watch history from the client')
  const episodeNumber = season * 10000 + episode
  console.log({ episodeNumber, showId: Number(showId) })
  return showsWatchHistoryCollection(uid)
    .where('showId', '==', Number(showId))
    .where('episodeNumber', '==', episodeNumber)
    .get()
    .then(result => {
      console.log('s', result.size)
      return result.docs.filter(d => d.exists).map(d => d.ref.delete())
    })
}
