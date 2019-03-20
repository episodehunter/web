import { LoadingState } from './loading-state'
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
