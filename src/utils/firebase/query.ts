import { format, parse, subDays } from 'date-fns'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { getUser } from '../auth.util'
import { now } from '../date.utils'
import { isInvalid, storage } from './storage'
import {
  CacheObj,
  Db,
  Episode,
  FbEpisode,
  Show,
  UpcomingEpisodes,
  UserMetaData
} from './types'

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
  getDatabase()
    .collection('shows')
    .doc(showId)
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
      return show as Show
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
    return showCache.data
  })
}

export function getHighestWatchedEpisode(
  userId: string,
  showId: string
): Promise<Episode | null> {
  return showsWatchHistoryCollection(userId)
    .where('showId', '==', Number(showId))
    .orderBy('episodeNumber', 'desc')
    .limit(1)
    .get()
    .then(querySnapshot => {
      let episode: FbEpisode = null as any
      querySnapshot.forEach(doc => {
        episode = doc.data() as FbEpisode
      })
      if (episode) {
        return Object.assign(episode, { aired: parse(episode.aired) })
      }
      return null
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

export function getHighestWatchedEpisodeUpdatets(
  userId: string,
  showId: string,
  cb: (qs: firebase.firestore.QuerySnapshot) => void
) {
  return showsWatchHistoryCollection(userId)
    .where('showId', '==', showId)
    .orderBy('episodeNumber', 'desc')
    .limit(1)
    .onSnapshot(cb)
}
