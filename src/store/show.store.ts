import { Show } from './show'
import { ShowResponse } from '../api/responses'

const shows = [
  {
    id: 0,
    name: '',
    tvdbId: 260449,
    episodes: []
  },
  {
    id: 1,
    name: '',
    tvdbId: 80379,
    episodes: []
  },
  {
    id: 2,
    name: '',
    tvdbId: 78804,
    episodes: []
  },
  {
    id: 3,
    name: '',
    tvdbId: 175001,
    episodes: []
  },
  {
    id: 4,
    name: '',
    tvdbId: 153021,
    episodes: []
  },
  {
    id: 5,
    name: '',
    tvdbId: 72449,
    episodes: []
  },
  {
    id: 6,
    name: '',
    tvdbId: 247897,
    episodes: []
  },
  {
    id: 7,
    name: '',
    tvdbId: 328724,
    episodes: []
  },
  {
    id: 8,
    name: '',
    tvdbId: 270915,
    episodes: []
  }
]

export class ShowStore {
  shows: Show[] = []

  constructor() {
    this.shows = shows.map((show: ShowResponse) =>
      Show.createFromResponse(show)
    )
  }
}
