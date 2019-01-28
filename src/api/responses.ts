export type HistoryResponse = {
  episodeNumber: number
  time: string
  type: number
  season: number
  episode: number
  showName: string
  ids: {
    showId: number
    showTvdb: number
  }
}
