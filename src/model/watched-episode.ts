import * as FirebaseModel from '../utils/firebase/types';

export interface WatchedEpisode {
  episode: number
  episodeNumber: number
  season: number
  showId: number
  time: Date
  type: FirebaseModel.WatchEnum
}

export function createWatchedEpisode(ew: FirebaseModel.WatchedEpisode): WatchedEpisode {
  return {
    episode: ew.episode,
    episodeNumber: ew.episodeNumber,
    season: ew.season,
    showId: ew.showId,
    time: ew.time.toDate(),
    type: ew.type
  }
}
