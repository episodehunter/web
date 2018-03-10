export type EpisodeResponse = {
  id: string
  name: string
  season: string
  episode: string
}

export class Episode {
  id: string = ''
  name: string = ''
  season: string = ''
  episode: string = ''

  static createFromResponse = (episodeResponse: EpisodeResponse) => {
    const episode = new Episode()
    episode.id = episodeResponse.id
    episode.name = episodeResponse.name
    episode.season = episodeResponse.season
    episode.episode = episodeResponse.episode
    return episode
  }
}
