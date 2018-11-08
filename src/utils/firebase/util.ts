import { getUserMetaData } from './query'
import { userMetaData$ } from './selectors'

export function updateLocalUserMetadata() {
  return getUserMetaData().then(metadata => {
    userMetaData$.next(metadata)
    return metadata
  })
}
