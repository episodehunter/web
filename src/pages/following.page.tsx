import React from 'react'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { EmptyState } from '../components/empty-state'
import { ErrorState } from '../components/error-state'
import { Following } from '../components/following'
import { useGetFollowingShowsQuery } from '../dragonstone'
import { FollowingShow } from '../types/following'
import { SpinnerPage } from './spinner.page'

export const FollowingPage = () => {
  const { loading, error, data } = useGetFollowingShowsQuery()

  if (error) {
    return <ErrorState />
  }

  if (loading || !data) {
    return <SpinnerPage />
  }

  if (data.following.length === 0) {
    return <EmptyState />
  }

  const shows = data.following.map(following => following.show).sort(sortShows)

  return (
    <PageWrapper>
      <Following shows={shows} />
    </PageWrapper>
  )
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
