import { isSameDay } from 'date-fns'
import React from 'react'
import { Subscription } from 'rxjs'
import styled from 'styled-components'
import { Upcoming } from '../components/upcoming'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { isAfterDaysFrom, isBeforeDaysFrom, now } from '../utils/date.utils'
import { upcomingEpisodes$ } from '../utils/firebase/selectors'
import { ShowWithUpcomingEpisodes } from '../utils/firebase/types'
import { SpinnerPage } from './spinner.page'

type Upcoming = {
  justAired: ShowWithUpcomingEpisodes[]
  today: ShowWithUpcomingEpisodes[]
  weekAhead: ShowWithUpcomingEpisodes[]
  upcoming: ShowWithUpcomingEpisodes[]
  tba: ShowWithUpcomingEpisodes[]
  ended: ShowWithUpcomingEpisodes[]
}

type State = {
  upcoming: Upcoming
  loading: boolean
}

export class UpcomingPage extends React.Component<{}, State> {
  private subscribtions: Subscription
  state = {
    upcoming: {
      justAired: [],
      today: [],
      weekAhead: [],
      upcoming: [],
      tba: [],
      ended: []
    },
    loading: true
  }

  componentDidMount() {
    this.subscribtions = upcomingEpisodes$.subscribe(shows => {
      this.setState({
        loading: false,
        upcoming: upcoming(shows)
      })
    })
  }

  componentWillUnmount() {
    this.subscribtions.unsubscribe()
  }

  render() {
    const {
      loading,
      upcoming: { justAired, tba, today, upcoming, weekAhead, ended }
    } = this.state
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
}

function upcoming(shows: ShowWithUpcomingEpisodes[], today = now()) {
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
      isAfterFiveDaysAgo(show.prevEpisode!.aired)
    ) {
      upcoming.justAired.push(show)
    }

    if (show.ended) {
      upcoming.ended.push(show)
    } else if (!hasNextEpisode(show)) {
      upcoming.tba.push(show)
    }

    if (hasNextEpisode(show)) {
      if (isSameDay(today, show.nextEpisode!.aired)) {
        upcoming.today.push(show)
      } else if (isBeforeAWeekFromNow(show.nextEpisode!.aired)) {
        upcoming.weekAhead.push(show)
      } else {
        upcoming.upcoming.push(show)
      }
    }
  }
  return upcoming
}

const hasPreviousEpisode = (show: ShowWithUpcomingEpisodes) =>
  Boolean(show.prevEpisode)
const hasNextEpisode = (show: ShowWithUpcomingEpisodes) =>
  Boolean(show.nextEpisode)

export const extractNextEpisode = (show: ShowWithUpcomingEpisodes) =>
  show.nextEpisode
export const extractPrevEpisode = (show: ShowWithUpcomingEpisodes) =>
  show.prevEpisode
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
