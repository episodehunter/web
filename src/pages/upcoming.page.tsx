import { captureException } from '@sentry/browser'
import { isSameDay } from 'date-fns'
import React from 'react'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { EmptyState } from '../components/empty-state'
import { ErrorState } from '../components/error-state'
import { Upcoming } from '../components/upcoming'
import { useGetUpcomingQuery } from '../dragonstone'
import { UpcomingShow } from '../types/upcoming'
import { isBeforeDaysFrom, now, parse } from '../utils/date.utils'
import { SpinnerPage } from './spinner.page'

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
    <PageWrapper>
      <Upcoming
        showDate={true}
        title={'Just aired'}
        shows={upcoming.justAired}
        episodeKey="justAirdEpisode"
      />
      <Upcoming
        showDate={false}
        title={'Today'}
        shows={upcoming.today}
        episodeKey="upcomingEpisode"
      />
      <Upcoming
        showDate={true}
        title={'The week ahead'}
        shows={upcoming.weekAhead}
        episodeKey="upcomingEpisode"
      />
      <Upcoming
        showDate={true}
        title={'Upcoming'}
        shows={upcoming.upcoming}
        episodeKey="upcomingEpisode"
      />
      <Upcoming showDate={false} title={'TBA'} shows={upcoming.tba} episodeKey="upcomingEpisode" />
      <Upcoming
        showDate={false}
        title={'Ended'}
        shows={upcoming.ended}
        episodeKey="upcomingEpisode"
      />
    </PageWrapper>
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
  upcoming.justAired.sort((a, b) =>
    a.justAirdEpisode!.aired.localeCompare(b.justAirdEpisode!.aired)
  )
  upcoming.weekAhead.sort((a, b) =>
    a.upcomingEpisode!.aired.localeCompare(b.upcomingEpisode!.aired)
  )
  upcoming.upcoming.sort((a, b) => a.upcomingEpisode!.aired.localeCompare(b.upcomingEpisode!.aired))
  upcoming.tba.sort((a, b) => a.name.localeCompare(b.name))
  upcoming.ended.sort((a, b) => a.name.localeCompare(b.name))
  return upcoming
}
