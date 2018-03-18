import {
  action,
  observable,
  runInAction,
  computed,
  onBecomeObserved
} from 'mobx'
import { Show } from './show'
import { FollowingResponse, ShowResponse } from '../api/responses'
import { api } from '../api/api'
import { yyyymmdd } from '../utils/date.utils'

export class Following {
  @observable loading: boolean
  @observable following: Show[] = []

  constructor() {
    const storageFollowing = localStorage.getItem('following') || ''

    if (storageFollowing) {
      const following = JSON.parse(storageFollowing) as ShowResponse[]
      this.following = following.map(show => Show.createFromResponse(show))
    }

    onBecomeObserved(this, 'following', this.fetch)
  }

  @computed
  get fetched() {
    return this.following.length > 0
  }

  @computed
  get justAired() {
    const fiveDaysAgo = new Date()
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
    return this.following.filter(
      show => show.previousEpisode.firstAired > yyyymmdd(fiveDaysAgo)
    )
  }

  @computed
  get today() {
    const today = new Date()
    return this.following.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired === yyyymmdd(today)
    )
  }

  @computed
  get weekAhead() {
    const weekAhead = new Date()
    weekAhead.setDate(weekAhead.getDate() + 7)
    return this.following.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired <= yyyymmdd(weekAhead)
    )
  }

  @computed
  get upcoming() {
    const weekAhead = new Date()
    weekAhead.setDate(weekAhead.getDate() + 7)
    return this.following.filter(
      show =>
        show.nextEpisode && show.nextEpisode.firstAired > yyyymmdd(weekAhead)
    )
  }

  @action
  fetch = () => {
    if (this.fetched) {
      return
    }

    this.loading = true

    api
      .fetchFollowing()
      .then((res: FollowingResponse) => {
        runInAction(() => {
          this.following = res.following.map(show =>
            Show.createFromResponse(show)
          )
          localStorage.setItem('following', JSON.stringify(this.following))
        })
      })
      .then(() => {
        runInAction(() => {
          this.loading = false
        })
      })
  }
}
