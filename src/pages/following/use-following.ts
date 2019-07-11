import { captureException } from '@sentry/browser'
import { useEffect, useState } from 'react'
import { useGqClient } from '../../global-context'
import { FollowingShow } from '../../types/following'
import { fetchFollowing } from './fetch-following'

export function useFollowing() {
  const client = useGqClient()
  const [shows, setShows] = useState<FollowingShow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchFollowing(client)
      .then(result => setShows(result.sort(sortShows)))
      .catch(err => {
        captureException(err)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return [shows, isLoading, hasError] as const
}

function sortShows(s1: FollowingShow, s2: FollowingShow) {
  if (
    s1.nextToWatch.numberOfEpisodesToWatch === 0 &&
    s2.nextToWatch.numberOfEpisodesToWatch !== 0
  ) {
    return 1
  } else if (
    s2.nextToWatch.numberOfEpisodesToWatch === 0 &&
    s1.nextToWatch.numberOfEpisodesToWatch !== 0
  ) {
    return -1
  }
  const p = s1.nextToWatch.numberOfEpisodesToWatch - s2.nextToWatch.numberOfEpisodesToWatch
  if (p === 0) {
    return s1.name.localeCompare(s2.name)
  } else {
    return p
  }
}
