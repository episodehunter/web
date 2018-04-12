import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
import { Spinner } from '../components/spinner'
import { UpcomingStore } from '../store/upcoming'
import { Upcoming } from '../components/upcoming'
import { media } from '../styles/media-queries'

type Props = {
  upcoming: UpcomingStore
}

export class UpcomingPageComponent extends React.Component<Props> {
  render() {
    const { upcoming } = this.props
    return (
      <Wrapper>
        {upcoming.isLoading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <UpcomingWrapper>
            <Upcoming
              title={'Just aired'}
              shows={upcoming.justAired}
              previous
            />
            <Upcoming title={'Today'} shows={upcoming.today} />
            <Upcoming title={'The week ahead'} shows={upcoming.weekAhead} />
            <Upcoming title={'Upcoming'} shows={upcoming.upcoming} />
            <Upcoming title={'TBA'} shows={upcoming.tba} />
          </UpcomingWrapper>
        )}
      </Wrapper>
    )
  }
}

export const UpcomingPage = requireLogin<Props>(
  inject('upcoming')(observer(UpcomingPageComponent))
)

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
