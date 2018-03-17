import { EpisodeResponse } from '../api/responses'
import { observable } from 'mobx'

export class Episode {
  @observable name: string = ''
  @observable tvdbId: number
  @observable firstAired: string
  @observable season: number

  static createFromResponse = (episodeResponse: EpisodeResponse) => {
    const episode = new Episode()
    episode.name = episodeResponse.name
    episode.tvdbId = episodeResponse.tvdbId
    episode.firstAired = episodeResponse.firstAired
    episode.season = episodeResponse.season
    return episode
  }
}
