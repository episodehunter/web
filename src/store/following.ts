import { action, observable, runInAction, computed } from 'mobx'
import { Show } from './show'
import { FollowingResponse } from '../api/responses'
import { api } from '../api/api'

export class Following {
  @observable loading: boolean
  @observable following: Show[]

  constructor() {
    const storageFollowing = localStorage.getItem('following') || ''
    if (storageFollowing) {
      this.following = JSON.parse(storageFollowing)
    }
  }

  @computed
  get fetched() {
    return this.following.length > 0
  }

  @action
  fetch = () => {
    this.loading = true

    api
      .fetchFollowing()
      .then((res: FollowingResponse) => {
        this.following = res.following.map(show =>
          Show.createFromResponse(show)
        )
        localStorage.setItem('following', JSON.stringify(this.following))
      })
      .then(() => {
        runInAction(() => {
          this.loading = false
        })
      })
  }
}
