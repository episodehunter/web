// import { action, computed, observable } from 'mobx'
// import { tap } from 'rxjs/operators'
// import { Dispatch } from '../actions/dispatcher'
// import { Request } from '../request'
// import { ModelLoader } from '../utils/model-loader.util'
// import { ShowStore } from './show.store'

// export class Following {
//   private showStore: ShowStore
//   private dispatch: Dispatch
//   private request: Request
//   loader = new ModelLoader()

//   @observable
//   followingShowsId: number[] = []

//   constructor(showStore: ShowStore, request: Request, dispatch: Dispatch) {
//     this.showStore = showStore
//     this.dispatch = dispatch
//     this.request = request
//     this.loader.register(() => request.following())(showIds =>
//       this.updateFollwing(showIds)
//     )
//   }

//   @computed
//   get shows() {
//     return this.followingShowsId.map(id => this.showStore.getShow(id))
//   }

//   @computed
//   get isLoading() {
//     return (
//       this.loader.isLoading || this.shows.some(show => show.loader.isLoading)
//     )
//   }

//   isFollowingShow(id: number) {
//     return this.followingShowsId.includes(id)
//   }

//   loadFollowingShows() {
//     console.warn('Trying to load follwoing shows')
//   }

//   @action
//   updateFollwing(showIds: number[]) {
//     this.followingShowsId = showIds
//     showIds.forEach(id => {
//       this.showStore.addShow(id)
//       this.dispatch.fetchParialShow(id)
//     })
//   }

//   follow(id: number) {
//     return this.request
//       .followShow(id)
//       .pipe(tap(action(() => this.followingShowsId.push(id))))
//   }

//   unfollow(id: number) {
//     const update = () =>
//       (this.followingShowsId = this.followingShowsId.filter(fid => fid !== id))

//     return this.request.unfollowShow(id).pipe(tap(action(update)))
//   }
// }
