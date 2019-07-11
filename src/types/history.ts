export interface HistoryWatchedEpisode {
  time: number
}

export interface HistoryShow {
  ids: {
    tvdb: number
    id: number
  }
  name: string
}

export interface HistoryEpisode {
  ids: {
    tvdb: number
  }
  name: string
  episodenumber: number
}

export interface History {
  watchedEpisode: HistoryWatchedEpisode
  show: HistoryShow
  episode: HistoryEpisode
}
