// import { isBefore, isValid, startOfDay } from 'date-fns'
// import { computed, observable } from 'mobx'
// import { EpisodeResponse } from '../api/responses'
// import { WatchedHistory } from '../types'
// import { isSameDayOrAfter, Today, today } from '../utils/date.utils'
// import { isSameEpisode } from '../utils/episode.util'
// import { compose } from '../utils/function.util'
// import { exist, filter, findBest } from '../utils/iterable.util'
// import { HistoryStore } from './history.store'

// export class Episode {
//   private history: HistoryStore
//   private today: Today
//   private showId: number

//   @observable
//   name: string = ''

//   @observable
//   tvdbId: number

//   @observable
//   firstAired: Date | null

//   @observable
//   season: number

//   @observable
//   episode: number

//   @observable
//   overview: string

//   constructor(today, history: HistoryStore) {
//     this.today = today
//     this.history = history
//   }

//   static createFromResponse = (
//     showId: number,
//     episodeResponse: EpisodeResponse,
//     history: HistoryStore,
//     _today = today
//   ) => {
//     const episode = new Episode(_today, history)
//     episode.showId = showId
//     episode.name = episodeResponse.name
//     episode.tvdbId = episodeResponse.tvdbId
//     episode.firstAired = episodeResponse.firstAired
//       ? startOfDay(new Date(episodeResponse.firstAired))
//       : null
//     episode.season = episodeResponse.season
//     episode.episode = episodeResponse.episode
//     episode.overview = episodeResponse.overview
//     return episode
//   }

//   @computed
//   get seasonAndEpisodeNumber() {
//     return (
//       'S' +
//       String(this.season).padStart(2, '0') +
//       'E' +
//       String(this.episode).padStart(2, '0')
//     )
//   }

//   @computed
//   get latestWatchedDate(): Date | null {
//     const watchHistory: WatchedHistory | undefined = compose(
//       findBest<WatchedHistory>((prev, curr) => prev.time < curr.time),
//       filter<WatchedHistory>(episode => isSameEpisode(episode, this))
//     )(this.history.getHistoryForShow(this.showId).history)

//     if (!watchHistory) {
//       return null
//     }
//     const date = new Date(watchHistory.time * 1000)
//     if (!isValid(date)) {
//       return null
//     }
//     return date
//   }

//   @computed
//   get hasWatchedEpisode(): boolean {
//     return exist((episode: WatchedHistory) => isSameEpisode(episode, this))(
//       this.history.getHistoryForShow(this.showId).history
//     )
//   }

//   @computed
//   get hasValidAirDate() {
//     return Boolean(this.firstAired && isValid(this.firstAired))
//   }

//   @computed
//   get hasAird() {
//     return (
//       this.hasValidAirDate && isBefore(this.firstAired as Date, this.today())
//     )
//   }

//   @computed
//   get willAirInTheFuture() {
//     const { hasValidAirDate, firstAired, today } = this
//     return hasValidAirDate && isSameDayOrAfter(firstAired as Date, today)
//   }

//   markAsWatched() {
//     return this.history
//       .getHistoryForShow(this.showId)
//       .addEpisode(this.season, this.episode)
//   }

//   markAsUnwatched() {
//     return this.history
//       .getHistoryForShow(this.showId)
//       .removeEpisode(this.season, this.episode)
//   }
// }

// export interface EpisodeWithAirDate extends Episode {
//   firstAired: Date
// }
