import 'firebase/firestore'
import { Observable, ReplaySubject } from 'rxjs'
import { filter, map, shareReplay, switchMap } from 'rxjs/operators'
import { getUser } from '../auth.util'
import { now } from '../date.utils'
import {
  getEpisodesAfter,
  getHighestWatchedEpisode,
  getHighestWatchedEpisodeUpdatets,
  getShowCacheFallbackOnNetwork,
  getUpcommingEpisodes
} from './query'
import {
  Show,
  ShowWithEpisodesToWatch,
  ShowWithUpcomingEpisodes,
  UserMetaData
} from './types'

export const userMetaData$ = new ReplaySubject<UserMetaData | null>(1)

export const followingIds$ = userMetaData$.pipe(
  filter(Boolean),
  map((metadata: UserMetaData) => metadata.following)
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
  switchMap(shows => {
    const toDay = now()
    const userId = getUser()!.uid
    return Promise.all(
      shows.map(async show => {
        const highestWatchedEpisode = await getHighestWatchedEpisode(
          userId,
          show.id
        )
        let episodeNumber = 0
        if (highestWatchedEpisode) {
          episodeNumber = highestWatchedEpisode.episodeNumber
        }
        const episodesToWatch = await getEpisodesAfter(show.id, episodeNumber)
        return Object.assign(
          { episodesToWatch: episodesToWatch.filter(e => e.aired <= toDay) },
          show
        ) as ShowWithEpisodesToWatch
      })
    )
  })
)

function getHighestWatchedEpisode$(userId, showId) {
  return Observable.create(observer => {
    const unsubscribe = getHighestWatchedEpisodeUpdatets(
      userId,
      showId,
      querySnapshot => {
        querySnapshot.forEach(doc => {
          observer.next(doc.data())
        })
      }
    )
    return () => unsubscribe()
  }).pipe(shareReplay(1))
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
