// import { configure } from 'mobx';
// import { Dispatch } from '../actions/dispatcher';
// import { Request } from '../request';
// import { Following } from './following';
// import { HistoryStore } from './history.store';
// import { ShowStore } from './show.store';
// import { UpcomingStore } from './upcoming';
// import { UserStore } from './user';

// configure({ enforceActions: 'observed' })

// export class Store {
//   showStore: ShowStore
//   following: Following
//   upcoming: UpcomingStore
//   user: UserStore
//   history: HistoryStore

//   constructor(dispatch: Dispatch, request: Request) {
//     this.history = new HistoryStore(request)
//     this.showStore = new ShowStore(request, this.history)
//     this.user = new UserStore()
//     this.following = new Following(this.showStore, request, dispatch)
//     this.upcoming = new UpcomingStore(this.following)
//     this.user = new UserStore()
//   }
// }
