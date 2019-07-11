import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { captureException } from '@sentry/browser'
import { EmptyState } from '../../components/empty-state'
import { Upcoming } from '../../components/upcoming'
import { media } from '../../styles/media-queries'
import { shark } from '../../utils/colors'
import { SpinnerPage } from '../spinner.page'
import { useUpcoming } from './use-upcoming'
import { ErrorState } from '../../components/error-state'

export const UpcomingPage = observer(() => {
  const [upcoming, hasUpcoming, isLoading, hasError] = useUpcoming()

  if (isLoading) {
    return <SpinnerPage />
  }

  if (hasError || !upcoming) {
    captureException(new Error('Could not fetch upcoming'))
    return <ErrorState />
  }

  if (!hasUpcoming) {
    return <EmptyState />
  }

  return (
    <Wrapper>
      <UpcomingWrapper>
        <Upcoming title={'Just aired'} shows={upcoming.justAired} episodeKey="justAirdEpisode" />
        <Upcoming title={'Today'} shows={upcoming.today} episodeKey="upcomingEpisode" />
        <Upcoming
          title={'The week ahead'}
          shows={upcoming.weekAhead}
          episodeKey="upcomingEpisode"
        />
        <Upcoming title={'Upcoming'} shows={upcoming.upcoming} episodeKey="upcomingEpisode" />
        <Upcoming title={'TBA'} shows={upcoming.tba} episodeKey="upcomingEpisode" />
        <Upcoming title={'Ended'} shows={upcoming.ended} episodeKey="upcomingEpisode" />
      </UpcomingWrapper>
    </Wrapper>
  )
})

const UpcomingWrapper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`

const Wrapper = styled.div`
  padding-top: 70px;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
