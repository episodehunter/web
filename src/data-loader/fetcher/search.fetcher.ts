import { PublicTypes } from '../public-types'

export const createSearchFetcher = (searchWorker: Worker) => ({
  subscribe(cb: (result: PublicTypes.Title[]) => void) {
    const onMessage = (event: MessageEvent) => {
      cb(event.data.result)
    }
    searchWorker.addEventListener('message', onMessage)
    return () => searchWorker.removeEventListener('message', onMessage)
  },
  search(searchString: string) {
    searchWorker.postMessage(searchString)
  }
})
