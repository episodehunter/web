// import { action, observable } from 'mobx';
import { TitlesResponse } from '../api/responses';
// import { ModelStatus } from '../enum';
// import { Request } from '../request';
import { TitlesStorageObject } from '../storage';

// export type Title = {
//   id: number // TODO: Change to string
//   name: string
//   tvdbId: number // TODO: Add
//   followers: number
// }

// export class TitlesStore {
//   private request: Request
//   @observable
//   status: ModelStatus = ModelStatus.notLoaded
//   @observable
//   titles: Title[] = []

//   constructor(request: Request) {
//     this.request = request
//   }

//   @action
//   update(titles: TitlesResponse) {
//     this.titles = titles
//   }

//   async fetchTitles() {
//     this.status = ModelStatus.loading

//     try {
//       const titlesFromStorage = await storage.titles.get()
//       if (titlesFromStorage) {
//         this.update(titlesFromStorage.data)
//       }
//       if (needToUpdate(titlesFromStorage)) {
//         const titlesFromApi = await this.request.fetchTitles()
//         const updatedTitles = await storage.titles.set(titlesFromApi)
//         this.update(updatedTitles)
//       }
//       this.status = ModelStatus.loaded
//     } catch (e) {
//       this.status = ModelStatus.error
//     }
//   }
// }

function needToUpdate(
  storageTitles: TitlesStorageObject<TitlesResponse>,
  now = Date.now()
) {
  const aWeekAgo = now - 7 * 24 * 60 * 60 * 1000
  return (
    !storageTitles ||
    !storageTitles.data ||
    storageTitles.date.getTime() < aWeekAgo
  )
}
