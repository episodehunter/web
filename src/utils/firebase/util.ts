import { getUserMetaData } from './query'
import { userMetaData$ } from './selectors'
import { Episode, Show, State } from './types'

export function updateLocalUserMetadata() {
  return getUserMetaData().then(metadata => {
    userMetaData$.next(metadata)
    return metadata
  })
}

export function sortShowsAfterEpisodesAirDate(
  data: { show: Show; episodes: State<Episode[]> }[]
) {
  return data.sort((a, b) => {
    const aIsLoading = a.episodes.status !== 'loaded'
    const bIsLoading = a.episodes.status !== 'loaded'
    if (aIsLoading && bIsLoading) {
      return 0
    } else if (aIsLoading) {
      return 1
    } else if (bIsLoading) {
      return -1
    }

    const aCaughtUp = a.episodes.data!.length === 0
    const bCaughtUp = a.episodes.data!.length === 0
    const aEndedAndCaughtUp = a.show.ended && aCaughtUp
    const bEndedAndCaughtUp = a.show.ended && bCaughtUp
    if (aEndedAndCaughtUp && bEndedAndCaughtUp) {
      return 0
    } else if (aEndedAndCaughtUp) {
      return 1
    } else if (bEndedAndCaughtUp) {
      return -1
    } else if (aCaughtUp && bCaughtUp) {
      return 0
    } else if (aCaughtUp) {
      return 1
    } else if (bCaughtUp) {
      return -1
    }
    return (
      b.episodes.data![b.episodes.data!.length - 1].aired.getTime() -
      a.episodes.data![a.episodes.data!.length - 1].aired.getTime()
    )
  })
}
