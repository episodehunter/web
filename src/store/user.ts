import { observable, action, runInAction, computed } from 'mobx'
import { authApi } from '../api/auth.api'

type NullString = string | null

export class User {
  @observable token: NullString = localStorage.getItem('token')
  @observable expires: NullString = localStorage.getItem('expires')
  @observable nickname: NullString = localStorage.getItem('nickname')
  @observable picture: NullString = localStorage.getItem('picture')

  @action
  setAuthentication = (token: string, expires: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expires', expires)
    this.token = token
    this.expires = expires
    this.fetchUserInfo()
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
    authApi.fetchUser().then(res => {
      runInAction(() => {
        localStorage.setItem('nickname', res.nickname)
        localStorage.setItem('picture', res.picture)
        this.nickname = res.nickname
        this.picture = res.picture
      })
    })
  }
}
