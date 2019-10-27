import React from 'react'
import styled from 'styled-components'
import { captureException } from '@sentry/browser'
import { EmptyState } from '../components/empty-state'
import { Upcoming } from '../components/upcoming'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { SpinnerPage } from './spinner.page'
import { ErrorState } from '../components/error-state'
import { useGetUpcomingQuery } from '../dragonstone'
import { UpcomingShow } from '../types/upcoming'
import { now, isBeforeDaysFrom, parse } from '../utils/date.utils'
import { isSameDay } from 'date-fns'

export const UpcomingPage = () => {
  const { data, error, loading } = useGetUpcomingQuery()

  if (error) {
    captureException(new Error('Could not fetch upcoming'))
    return <ErrorState />
  }

  if (loading || !data) {
    return <SpinnerPage />
  }
  const upcoming = calculateUpcoming(data.following.map(f => f.show))
  const hasUpcoming = Object.values(upcoming).some(u => u.length > 0)

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
}

interface UpcomingCollection {
  justAired: UpcomingShow[]
  today: UpcomingShow[]
  weekAhead: UpcomingShow[]
  upcoming: UpcomingShow[]
  tba: UpcomingShow[]
  ended: UpcomingShow[]
}

function calculateUpcoming(upcomingShows: UpcomingShow[], today = now()): UpcomingCollection {
  const upcoming: UpcomingCollection = {
    justAired: [],
    today: [],
    weekAhead: [],
    upcoming: [],
    tba: [],
    ended: []
  }
  const isBeforeAWeekFromNow = isBeforeDaysFrom(7, today)
  for (const show of upcomingShows) {
    const prevEpisode = show.justAirdEpisode
    const nextEpisode = show.upcomingEpisode

    if (prevEpisode) {
      upcoming.justAired.push(show)
    }

    if (show.ended) {
      upcoming.ended.push(show)
    } else if (!nextEpisode) {
      upcoming.tba.push(show)
    } else {
      if (isSameDay(today, parse(nextEpisode.aired))) {
        upcoming.today.push(show)
      } else if (isBeforeAWeekFromNow(new Date(nextEpisode.aired))) {
        upcoming.weekAhead.push(show)
      } else {
        upcoming.upcoming.push(show)
      }
    }
  }
  return upcoming
}

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
