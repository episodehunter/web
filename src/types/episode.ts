import { GetEpisodesForSeasonQuery } from '../dragonstone'

export type WatchedEpisode = SeasonEpisode['watched'][0]
export type SeasonEpisode = GetEpisodesForSeasonQuery['season'][0]
