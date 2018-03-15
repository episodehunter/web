import { Episode } from './episode'
import { ShowResponse } from '../api/responses'

export class Show {
  id: number
  tvdbId: number
  name: string
  genre: string[]
  language: string
  network: string
  runtime: number
  ended: boolean
  imdbId: string
  firstAired: Date
  airsDayOfWeek: string
  airsTime: string
  episodes: Episode[]

  static createFromResponse = (showResponse: ShowResponse) => {
    let show = new Show()
    show = Object.assign({}, showResponse, {
      episodes: showResponse.episodes.map(episode =>
        Episode.createFromResponse(episode)
      )
    })
    return show
  }
}
