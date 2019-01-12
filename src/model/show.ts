import * as FirebaseModel from '../utils/firebase/types';

export interface Show {
  ids: {
    id: string
    tvdb: number
    imdb?: string
  }
  airs: {
    day: number // 0-6
    first: string
    time: string
  }
  ended: boolean
  genre: string[]
  language: string
  lastupdated: number
  name: string
  network: string
  overview: string
  runtime: number
  numberOfFollowers: number
  totalNumberOfEpisodes: number
  seasons: number[]
}

export function createShow(show: FirebaseModel.Show): Show {
  return {
    ids: {
      id: show.ids.id || show.oldId,
      tvdb: show.ids.tvdb,
      imdb: show.ids.imdb
    },
    airs: {
      day: show.airs.day,
      first: show.airs.first,
      time: show.airs.time
    },
    ended: show.ended,
    genre: show.genre,
    language: show.language,
    name: show.name,
    network: show.network,
    overview: show.overview,
    runtime: show.runtime,
    numberOfFollowers: show.numberOfFollowers,
    totalNumberOfEpisodes: show.totalNumberOfEpisodes,
    seasons: Array.isArray(show.seasons) ? show.seasons.sort() : []
  } as Show
}


