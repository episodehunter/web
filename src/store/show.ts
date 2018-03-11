import { Episode } from './episode'
import { ShowResponse } from '../api/responses'

export class Show {
  id: number
  tvdbId: number
  name: string
  episodes: Episode[]

  static createFromResponse = (showResponse: ShowResponse) => {
    const show = new Show()
    show.id = showResponse.id
    show.tvdbId = showResponse.tvdbId
    show.name = showResponse.name
    show.episodes = showResponse.episodes.map(episode =>
      Episode.createFromResponse(episode)
    )
    return show
  }
}
