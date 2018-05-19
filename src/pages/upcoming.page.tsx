import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Spinner } from '../components/spinner'
import { Upcoming } from '../components/upcoming'
import { Show } from '../store/show'
import { UpcomingStore } from '../store/upcoming'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'

type Props = {
  upcoming: UpcomingStore
}

export class UpcomingPageComponent extends React.Component<Props> {
  render() {
    const {
      upcoming: {
        isLoading,
        upcoming: { justAired, tba, today, upcoming, weekAhead }
      }
    } = this.props
    return (
      <Wrapper>
        {isLoading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <UpcomingWrapper>
            <Upcoming
              title={'Just aired'}
              shows={justAired}
              extractEpisodeAirDate={extractPrevEpisodeAirDate}
            />
            <Upcoming
              title={'Today'}
              shows={today}
              extractEpisodeAirDate={extractNextEpisodeAirDate}
            />
            <Upcoming
              title={'The week ahead'}
              shows={weekAhead}
              extractEpisodeAirDate={extractNextEpisodeAirDate}
            />
            <Upcoming
              title={'Upcoming'}
              shows={upcoming}
              extractEpisodeAirDate={extractNextEpisodeAirDate}
            />
            <Upcoming
              title={'TBA'}
              shows={tba}
              extractEpisodeAirDate={extractNextEpisodeAirDate}
            />
          </UpcomingWrapper>
        )}
      </Wrapper>
    )
  }
}

export const extractNextEpisodeAirDate = (show: Show) =>
  show.nextEpisode && show.nextEpisode.firstAired
export const extractPrevEpisodeAirDate = (show: Show) =>
  show.previousEpisode && show.previousEpisode.firstAired

export const UpcomingPage = inject('upcoming')(observer(UpcomingPageComponent))

const UpcomingWrapper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`

const Loading = styled.div`
  text-align: center;
`

const Wrapper = styled.div`
  padding-top: 70px;
  height: 100%;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
