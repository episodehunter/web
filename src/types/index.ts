export type SeasonNumber = number
export type EpisodeNumber = number
export type ShowId = number
export type UnixTimestamp = number
export type HistoryType = 'plexScrobble' | 'checkin'

export interface WatchedHistory {
  showId: ShowId
  season: SeasonNumber
  episode: EpisodeNumber
  time: UnixTimestamp
  type: HistoryType
}
