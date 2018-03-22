import { Show } from './show'
import { ShowResponse } from '../api/responses'

const shows = [
  {
    id: 0,
    name: '',
    genre: [] as any,
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 260449,
    episodes: [] as any
  },
  {
    id: 1,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 80379,
    episodes: []
  },
  {
    id: 2,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 78804,
    episodes: []
  },
  {
    id: 3,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 175001,
    episodes: []
  },
  {
    id: 4,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 153021,
    episodes: []
  },
  {
    id: 5,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 72449,
    episodes: []
  },
  {
    id: 6,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 247897,
    episodes: []
  },
  {
    id: 7,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 328724,
    episodes: []
  },
  {
    id: 8,
    name: '',
    genre: [],
    language: '',
    network: '',
    runtime: 1,
    ended: false,
    imdbId: '',
    firstAired: new Date(),
    airsDayOfWeek: '',
    airsTime: '',
    tvdbId: 270915,
    episodes: []
  }
]

export class FrontPageShowStore {
  shows: Show[] = []

  constructor() {
    this.shows = shows.map((show: ShowResponse) =>
      Show.createFromResponse(show)
    )
  }
}
