// import { action } from 'mobx'
// import { Request } from '../request'
// import { HistoryStore } from './history.store'
// import { Show } from './show'

// export class ShowStore {
//   shows: Map<number, Show> = new Map()
//   private request: Request
//   private history: HistoryStore

//   constructor(request: Request, history: HistoryStore) {
//     this.request = request
//     this.history = history
//   }

//   getShow(id: number): Show {
//     const show = this.shows.get(id)
//     if (!show) {
//       return this.createShow(id)
//     } else {
//       return show
//     }
//   }

//   @action
//   addShow(id: number): Show {
//     const show = this.shows.get(id)
//     if (!show) {
//       return this.createShow(id)
//     }
//     return show
//   }

//   @action
//   private createShow(id: number) {
//     const newShow = new Show(this.request, this.history, id)
//     this.shows.set(id, newShow)
//     return newShow
//   }
// }
