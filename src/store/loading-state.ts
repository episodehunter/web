import { observable } from 'mobx'
import { LoadingState as LoadingStateType } from '../enum/loading-state'

export class LoadingState {
  @observable loadingState = LoadingStateType.NotLoaded

  setLoading() {
    this.loadingState = LoadingStateType.Loading
  }

  setLoaded() {
    this.loadingState = LoadingStateType.Loaded
  }

  setNotLoaded() {
    this.loadingState = LoadingStateType.NotLoaded
  }

  setUpdating() {
    this.loadingState = LoadingStateType.Updating
  }

  hasLoaded() {
    return this.loadingState === LoadingStateType.Loaded
  }

  isLoading() {
    return this.loadingState === LoadingStateType.Loading
  }
}
