import { action, observable, runInAction } from 'mobx'
import { Show } from './show'
import { FollowingResponse } from '../api/responses'
import { api } from '../api/api'

export class Following {
  @observable loading: boolean
  @observable following: Show[]

  @action
  fetch = () => {
    this.loading = true

    api
      .fetchFollowing()
      .then((res: FollowingResponse) => {
        this.following = res.following.map(show =>
          Show.createFromResponse(show)
        )
      })
      .then(() => {
        runInAction(() => {
          this.loading = false
        })
      })
  }
}
