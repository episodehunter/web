import { parse } from 'date-fns';
import * as FirebaseModel from '../utils/firebase/types';

export type Episode = {
  name: string
  tvdbId: number
  aired: Date
  season: number
  episode: number
  episodeNumber: number
  overview: string
}

export type UpcomingEpisodes = {
  nextEpisode: Episode | null
  prevEpisode: Episode | null
}

export function createEpisode(ep: FirebaseModel.Episode): Episode {
  return {
    name: ep.name,
    tvdbId: ep.tvdbId,
    aired: parse(ep.aired),
    season: ep.season,
    episode: ep.episode,
    episodeNumber: ep.episodeNumber,
    overview: ep.overview
  }
}
