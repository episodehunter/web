import { EpisodeResponse } from '../api/responses'

export class Episode {
  name: string = ''

  static createFromResponse = (episodeResponse: EpisodeResponse) => {
    const episode = new Episode()
    episode.name = episodeResponse.name
    return episode
  }
}
