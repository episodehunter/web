import { action, computed, observable } from 'mobx'
import { toStream } from 'mobx-utils'
import { Observable, Subject, Subscription, from, never } from 'rxjs'
import { catchError, filter, switchMap, takeUntil, tap } from 'rxjs/operators'
import { ErrorState, LoadingState } from '../enum'

export class ModelLoader {
  @observable private loadingState = LoadingState.notLoaded
  @observable private errorState: ErrorState
  private loadingState$ = from(toStream(() => this.loadingState))
  private queue = new Subject()

  register<T>(load: () => Observable<T>) {
    return (next?: (v: T) => void): Subscription => {
      const hasLoaded$ = this.loadingState$.pipe(filter(hasLoaded))
      return this.queue
        .pipe(
          filter(() => !this.isFetching),
          takeUntil(hasLoaded$),
          tap(() => this.setNextLoadingState()),
          switchMap(load),
          tap(() => this.setLoadingState(LoadingState.loaded)),
          catchError(error => {
            console.error(error)
            this.rollBackLoadingState()
            this.setErrorState(ErrorState.error)
            return never()
          })
        )
        .subscribe(next)
    }
  }

  load() {
    this.queue.next(true)
  }

  @action
  private setNextLoadingState() {
    if (this.isNotLoaded) {
      this.setLoadingState(LoadingState.loading)
    } else {
      this.setLoadingState(LoadingState.updating)
    }
  }

  @action
  private rollBackLoadingState() {
    if (this.isLoading) {
      this.setLoadingState(LoadingState.notLoaded)
    } else {
      this.setLoadingState(LoadingState.loaded)
    }
  }

  @action
  private setLoadingState(newState: LoadingState) {
    this.loadingState = newState
  }

  @action
  private setErrorState(newState: ErrorState) {
    this.errorState = newState
  }

  @computed
  get isNotLoaded() {
    return this.loadingState === LoadingState.notLoaded
  }

  @computed
  get hasLoaded() {
    return hasLoaded(this.loadingState)
  }

  @computed
  get isLoading() {
    return this.loadingState === LoadingState.loading
  }

  @computed
  get isUpdating() {
    return this.loadingState === LoadingState.updating
  }

  @computed
  get isFetching() {
    return this.isUpdating || this.isLoading
  }

  @computed
  get isLoadedOrFetching() {
    return this.hasLoaded || this.isFetching
  }

  @computed
  get hasError() {
    return this.errorState === ErrorState.error
  }
}

function hasLoaded(state: LoadingState) {
  return state === LoadingState.loaded
}
