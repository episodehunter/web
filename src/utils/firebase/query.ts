import { format, parse, subDays } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getUser, getUserId } from '../auth.util';
import { now } from '../date.utils';
import { isInvalid, storage } from './storage';
import { CacheObj, Db, Episode, FbEpisode, Show, UpcomingEpisodes, UserMetaData, WatchedEpisode } from './types';

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

export function getUserMetaData(user = getUser()): Promise<UserMetaData> {
  if (!user) {
    throw new Error('You must sign in') // Todo. Create an error class
  }
  return userDoc(user.uid)
    .get()
    .then(r => {
      if (!r.exists) {
        throw new Error('Meta data does not exist') // TODO: Create an error class
      }
      return r.data() as UserMetaData
    })
}

export function getShow(id: string) {
  return showDoc(id)
    .get()
    .then(r => {
      if (!r.exists) {
        console.warn('Show do not exist for for id: ', id)
        return null
      }
      const show = r.data()
      show!.id = id
      show!.numberOfEpisodes = 100
      return show as Show
    })
}

export function getSeason(showId: string, season: number): Promise<Episode[]> {
  return episodesCollection(showId)
    .where('season', '==', season)
    .get()
    .then(r => r.docs.map(d => d.data()) as FbEpisode[])
    .then(episodes => episodes.map(episodeMapper).sort((a, b) => a.episodeNumber - b.episodeNumber))
}

export function getWatchSeason(showId: string, season: number, cb: (episodes: WatchedEpisode[]) => void, userId = getUserId()): () => void {
  return showsWatchHistoryCollection(userId)
    .where('season', '==', season)
    .where('showId', '==', Number(showId))
    .onSnapshot(snapshot => {
      cb(snapshot.docs.map(d => d.data()).map(d => Object.assign(d, { time: d.time.toDate() })) as WatchedEpisode[])
    })
}

export function getShowCacheFallbackOnNetwork(
  id: string
): Promise<Show | null> {
  return storage.show.get(id).then(showCache => {
    if (isInvalid(showCache, subDays(now(), 3))) {
      return getShow(id).then(show => {
        if (show) {
          return storage.show.set(show).then(() => show)
        }
        return Promise.resolve(null)
      })
    }
    return showCache!.data
  })
}

export function getEpisodesAfter(showId: string, episodeNumber: number) {
  return episodesCollection(showId)
    .where('episodeNumber', '>', episodeNumber)
    .get()
    .then(querySnapshot => {
      const episodes: Episode[] = []
      querySnapshot.forEach(doc => {
        const episode = doc.data() as FbEpisode
        episodes.push(Object.assign(episode, { aired: parse(episode.aired) }))
      })
      return episodes.sort((a, b) => a.aired.getTime() - b.aired.getTime())
    })
}

const upcomingEpisodesCache = new WeakMap<Show, CacheObj<UpcomingEpisodes>>()

export function getUpcommingEpisodes(show: Show, now = new Date()) {
  if (show.ended) {
    return Promise.resolve({
      nextEpisode: null,
      prevEpisode: null
    })
  }
  const episodesCache = upcomingEpisodesCache.get(show)
  if (
    episodesCache &&
    episodesCache.time + 24 * 60 * 60 * 1000 > now.getTime()
  ) {
    return Promise.resolve(episodesCache.data)
  }

  const threeDaysAgo = subDays(now, 3)
  return episodesCollection(show.id)
    .where('aired', '>=', format(threeDaysAgo, 'YYYY-MM-DD'))
    .orderBy('aired')
    .limit(2)
    .get()
    .then(querySnapshot => {
      const episodes = {
        nextEpisode: null,
        prevEpisode: null
      } as UpcomingEpisodes

      querySnapshot.forEach(doc => {
        if (episodes.nextEpisode) {
          return
        }
        const episode = doc.data() as FbEpisode
        if (episode.aired > format(now, 'YYYY-MM-DD')) {
          episodes.nextEpisode = Object.assign(episode, {
            aired: parse(episode.aired)
          })
        } else {
          episodes.nextEpisode = Object.assign(episode, {
            aired: parse(episode.aired)
          })
        }
      })
      upcomingEpisodesCache.set(show, {
        time: now.getTime(),
        data: episodes
      })
      return episodes
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
        cb(episodeMapper(querySnapshot.docs[0].data() as FbEpisode))
      }
    })
}

export function getNextEpisode(
  showId: string,
  episodeNumber: number
): Promise<Episode | null> {
  console.log('episodeNumber: ', episodeNumber)
  return episodesCollection(showId)
    .where('episodeNumber', '>', episodeNumber)
    .orderBy('episodeNumber')
    .limit(1)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size === 0) {
        return null
      } else if (querySnapshot.size === 1) {
        return episodeMapper(querySnapshot.docs[0].data() as any)
      } else {
        console.warn('Result should be 1 or 0')
        return null
      }
    })
}

function episodeMapper(fbEpisode: FbEpisode): Episode {
  return Object.assign(fbEpisode, {
    aired: parse(fbEpisode.aired)
  })
}

export function removeShowIdFromFollowing(uid = getUserId(), showId: string) {
  return userDoc(uid).update({ following: firebase.firestore.FieldValue.arrayRemove(Number(showId)) })
}

export function addShowIdFromFollowing(uid = getUserId(), showId: string) {
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
