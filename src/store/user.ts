import { FollowingResponse } from '../api/responses'
import { api } from '../api'
import { Show } from './show'
import { observable, action, runInAction, computed } from 'mobx'

type Token = string | null
type ExpiresIn = string | null
type UserInfoResponse = {
  nickname: string
  name: string
  picture: string
}

export class User {
  @observable token: Token = localStorage.getItem('token')
  @observable expires: ExpiresIn = localStorage.getItem('expires')
  @observable nickname: string
  @observable name: string
  @observable picture: string
  @observable loading: boolean = false
  @observable following: Show[]

  @action
  setAuthentication = (token: Token, expiresIn: ExpiresIn) => {
    this.token = token
    this.expires = expiresIn
  }

  @action
  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expires')
    this.token = null
    this.expires = null
  }

  @computed
  get isAuthenticated() {
    return this.expires && new Date().getTime() < Number(this.expires)
  }

  @action
  fetchUserInfo = () => {
    return fetch('https://episodehunter.auth0.com/userinfo', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
      .then(resp => resp.json())
      .then((res: UserInfoResponse) => {
        runInAction(() => {
          this.name = res.name
          this.nickname = res.nickname
          this.picture = res.picture
        })
      })
  }

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
