import { isBefore, isValid, startOfDay } from 'date-fns'
import { computed, observable } from 'mobx'
import { EpisodeResponse } from '../api/responses'
import { Today, isSameDayOrAfter, today } from '../utils/date.utils'

export class Episode {
  @observable name: string = ''
  @observable tvdbId: number
  @observable firstAired: Date | null
  @observable season: number
  @observable episode: number

  constructor(private today: Today) {}

  static createFromResponse = (
    episodeResponse: EpisodeResponse,
    _today = today
  ) => {
    const episode = new Episode(_today)
    episode.name = episodeResponse.name
    episode.tvdbId = episodeResponse.tvdbId
    episode.firstAired = episodeResponse.firstAired
      ? startOfDay(new Date(episodeResponse.firstAired))
      : null
    episode.season = episodeResponse.season
    episode.episode = episodeResponse.episode
    return episode
  }

  @computed
  get seasonAndEpisodeNumber() {
    return (
      'S' +
      String(this.season).padStart(2, '0') +
      'E' +
      String(this.episode).padStart(2, '0')
    )
  }

  @computed
  get hasValidAirDate() {
    return Boolean(this.firstAired && isValid(this.firstAired))
  }

  @computed
  get hasAird() {
    return (
      this.hasValidAirDate && isBefore(this.firstAired as Date, this.today())
    )
  }

  @computed
  get willAirInTheFuture() {
    const { hasValidAirDate, firstAired, today } = this
    return hasValidAirDate && isSameDayOrAfter(firstAired as Date, today)
  }
}

export interface EpisodeWithAirDate extends Episode {
  firstAired: Date
}
