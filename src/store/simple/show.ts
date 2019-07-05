// import { observable, action } from 'mobx'
// import { Show } from '../../types/show'

// interface ShowContainer extends Show {
//   followShow(): void
//   unfollowShow(): void
// }

// export function createShowStore(show: Show): ShowContainer {
//   const methos

//   return observable(
//     Object.assign(
//       {},
//       show,
//       {
//         followShow(this: ShowContainer) {
//           this.isFollowing = true
//         },
//         unfollowShow(this: ShowContainer) {
//           this.isFollowing = false
//         }
//       },
//       {
//         followShow: action
//       }
//     )
//   )
// }
