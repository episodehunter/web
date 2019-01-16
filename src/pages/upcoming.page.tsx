import { isSameDay } from 'date-fns'
import React, { useState } from 'react'
import { map } from 'rxjs/operators'
import styled from 'styled-components'
import { Upcoming } from '../components/upcoming'
import { ShowAndUpcomingEpisodes } from '../model'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { isAfterDaysFrom, isBeforeDaysFrom, now } from '../utils/date.utils'
import { upcomingEpisodes$ } from '../utils/firebase/selectors'
import { useObservable } from '../utils/use-observable'
import { SpinnerPage } from './spinner.page'

type Upcoming = {
  justAired: ShowAndUpcomingEpisodes[]
  today: ShowAndUpcomingEpisodes[]
  weekAhead: ShowAndUpcomingEpisodes[]
  upcoming: ShowAndUpcomingEpisodes[]
  tba: ShowAndUpcomingEpisodes[]
  ended: ShowAndUpcomingEpisodes[]
}

export function UpcomingPage() {
  const [loading, setLoading] = useState(true)
  const { justAired, today, weekAhead, upcoming, tba, ended } = useObservable(
    upcoming$,
    {
      justAired: [],
      today: [],
      weekAhead: [],
      upcoming: [],
      tba: [],
      ended: []
    },
    () => setLoading(false)
  )
  return loading ? (
    <SpinnerPage />
  ) : (
    <Wrapper>
      <UpcomingWrapper>
        <Upcoming
          title={'Just aired'}
          shows={justAired}
          extractEpisode={extractPrevEpisode}
        />
        <Upcoming
          title={'Today'}
          shows={today}
          extractEpisode={extractNextEpisode}
        />
        <Upcoming
          title={'The week ahead'}
          shows={weekAhead}
          extractEpisode={extractNextEpisode}
        />
        <Upcoming
          title={'Upcoming'}
          shows={upcoming}
          extractEpisode={extractNextEpisode}
        />
        <Upcoming title={'TBA'} shows={tba} extractEpisode={nullFn} />
        <Upcoming title={'Ended'} shows={ended} extractEpisode={nullFn} />
      </UpcomingWrapper>
    </Wrapper>
  )
}

const upcoming$ = upcomingEpisodes$.pipe(map(shows => upcoming(shows)))

function upcoming(shows: ShowAndUpcomingEpisodes[], today = now()) {
  const upcoming: Upcoming = {
    justAired: [],
    today: [],
    weekAhead: [],
    upcoming: [],
    tba: [],
    ended: []
  }
  const isAfterFiveDaysAgo = isAfterDaysFrom(-5, today)
  const isBeforeAWeekFromNow = isBeforeDaysFrom(7, today)
  for (let show of shows) {
    if (
      hasPreviousEpisode(show) &&
      isAfterFiveDaysAgo(show.upcomingEpisodes.prevEpisode!.aired)
    ) {
      upcoming.justAired.push(show)
    }

    if (show.show.ended) {
      upcoming.ended.push(show)
    } else if (!hasNextEpisode(show)) {
      upcoming.tba.push(show)
    }

    if (hasNextEpisode(show)) {
      if (isSameDay(today, show.upcomingEpisodes.nextEpisode!.aired)) {
        upcoming.today.push(show)
      } else if (
        isBeforeAWeekFromNow(show.upcomingEpisodes.nextEpisode!.aired)
      ) {
        upcoming.weekAhead.push(show)
      } else {
        upcoming.upcoming.push(show)
      }
    }
  }
  return upcoming
}

const hasPreviousEpisode = (show: ShowAndUpcomingEpisodes) =>
  Boolean(show.upcomingEpisodes.prevEpisode)
const hasNextEpisode = (show: ShowAndUpcomingEpisodes) =>
  Boolean(show.upcomingEpisodes.nextEpisode)

export const extractNextEpisode = (show: ShowAndUpcomingEpisodes) =>
  show.upcomingEpisodes.nextEpisode
export const extractPrevEpisode = (show: ShowAndUpcomingEpisodes) =>
  show.upcomingEpisodes.prevEpisode
export const nullFn = (_: any) => null

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
