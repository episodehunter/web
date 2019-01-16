// import { action, computed, observable } from 'mobx'
// import { never, Observable, Subject, Subscription } from 'rxjs'
// import { catchError, filter, switchMap, tap } from 'rxjs/operators'
// import { ErrorState, LoadingState } from '../enum'

// export const NO_TYPE = 0

// export class ModelLoader<R extends number> {
//   @observable
//   private loadingState = LoadingState.notLoaded

//   @observable
//   private errorState: ErrorState

//   private queue = new Subject<R>()

//   register<T>(load: (type: R) => Observable<T>) {
//     return (next?: (v: T) => void): Subscription => {
//       let currentType = -1
//       return this.queue
//         .pipe(
//           filter(type => !this.isFetching || currentType < type),
//           tap(() => this.setNextLoadingState()),
//           switchMap(type => {
//             currentType = type
//             return load(type)
//           }),
//           catchError(error => {
//             console.error(error)
//             this.rollBackLoadingState()
//             this.setErrorState(ErrorState.error)
//             return never()
//           })
//         )
//         .subscribe(value => {
//           next && next(value)
//           this.setLoadingState(LoadingState.loaded)
//         })
//     }
//   }

//   load(type: R) {
//     this.queue.next(type)
//   }

//   @action
//   private setNextLoadingState() {
//     if (this.isNotLoaded) {
//       this.setLoadingState(LoadingState.loading)
//     } else {
//       this.setLoadingState(LoadingState.updating)
//     }
//   }

//   @action
//   private rollBackLoadingState() {
//     if (this.isLoading) {
//       this.setLoadingState(LoadingState.notLoaded)
//     } else {
//       this.setLoadingState(LoadingState.loaded)
//     }
//   }

//   @action
//   private setLoadingState(newState: LoadingState) {
//     this.loadingState = newState
//   }

//   @action
//   private setErrorState(newState: ErrorState) {
//     this.errorState = newState
//   }

//   @computed
//   get isNotLoaded() {
//     return this.loadingState === LoadingState.notLoaded
//   }

//   @computed
//   get hasLoaded() {
//     return hasLoaded(this.loadingState)
//   }

//   @computed
//   get isLoading() {
//     return this.loadingState === LoadingState.loading
//   }

//   @computed
//   get isUpdating() {
//     return this.loadingState === LoadingState.updating
//   }

//   @computed
//   get isFetching() {
//     return this.isUpdating || this.isLoading
//   }

//   @computed
//   get hasError() {
//     return this.errorState === ErrorState.error
//   }
// }

// function hasLoaded(state: LoadingState) {
//   return state === LoadingState.loaded
// }
