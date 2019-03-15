import { observable } from 'mobx'
import { LoadingState as LoadingStateType } from '../enum/loading-state'
import { RootSore } from './root-store'

export class BaseStore {
  protected rootStore: RootSore
  loadingState = new LoadingState()

  constructor(rootStore: RootSore) {
    this.rootStore = rootStore
  }

  protected get showsStore() {
    return this.rootStore.shows
  }
}

class LoadingState {
  @observable loadingState = LoadingStateType.NotLoaded

  setLoading() {
    this.loadingState = LoadingStateType.Loading
  }

  setLoaded() {
    this.loadingState = LoadingStateType.Loaded
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
