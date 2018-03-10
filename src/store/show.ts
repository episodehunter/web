import { EpisodeResponse, Episode } from './episode'

export type ShowResponse = {
  id: number
  src: string
}

export class Show {
  id: number = 0
  src: string = ''
  episodes: Episode[] = []

  static createFromResponse = (showResponse: ShowResponse) => {
    const show = new Show()
    show.id = showResponse.id
    show.src = showResponse.src
    return show
  }

  fetchEpisodes = () => {
    document.cookie = 'episodehunter=' + localStorage.getItem('id_token')
    fetch('https://episodehunter.tv/api/shows/episode/76/1', {
      headers: {
        contentType: 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(episodes => {
        this.episodes = episodes.map((episode: EpisodeResponse) =>
          Episode.createFromResponse(episode)
        )
      })
      .catch(err => console.log(err))
  }
}
