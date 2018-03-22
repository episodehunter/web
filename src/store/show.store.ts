import { observable, computed } from 'mobx'
import { request } from '../request'
import { yyyymmdd } from '../utils/date.utils'
import { Episode } from './episode'

export class Show {
  @observable id: number
  @observable tvdbId: number
  @observable name: string
  @observable genre: string[]
  @observable language: string
  @observable network: string
  @observable runtime: number
  @observable ended: boolean
  @observable imdbId: string
  @observable firstAired: Date
  @observable airsDayOfWeek: string
  @observable airsTime: string
  @observable episodes: Episode[]

  @computed
  get nextEpisode() {
    const now = yyyymmdd(new Date())
    const futureEpisodes = this.episodes.filter(
      episode => episode.firstAired > now
    )
    return futureEpisodes[0]
  }

  @computed
  get previousEpisode() {
    const now = yyyymmdd(new Date())
    const previousEpisodes = this.episodes.filter(
      episode => episode.firstAired < now
    )
    return previousEpisodes[0]
  }
}

export class ShowStore {
  shows: Map<number, Show> = new Map()

  getShow(id: number) {
    const fetchingShow = request.show(id).then((show: Show) => {
      this.shows.set(id, show)
      return show
    })
    if (this.shows.has(id)) {
      return Promise.resolve(this.shows.get(id))
    }
    return fetchingShow
  }
}
