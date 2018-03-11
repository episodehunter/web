import { FollowingResponse } from '../api/responses'
import { api } from '../api'
import { Show } from './show'
import { observable, action, runInAction } from 'mobx'

export class User {
  @observable loading: boolean = false
  @observable following: Show[]

  @action
  fetchFollowing = () => {
    this.loading = true

    api.user
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
