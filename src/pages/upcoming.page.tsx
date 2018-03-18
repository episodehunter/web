import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
import { Spinner } from '../components/spinner'
import { Following } from '../store/following'
import { Upcoming } from '../components/upcoming'

type Props = {
  following?: Following
}

export class UpcomingPageComponent extends React.Component<Props> {
  componentWillMount() {
    if (!this.props.following!.fetched) {
      this.props.following!.fetch()
    }
  }

  render() {
    const { following } = this.props
    return (
      <Wrapper>
        {following!.loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <UpcomingWrapper>
            <Upcoming
              title={'Just aired'}
              shows={following!.justAired}
              previous
            />
            <Upcoming title={'Today'} shows={following!.today} />
            <Upcoming title={'The week ahead'} shows={following!.weekAhead} />
            <Upcoming title={'Upcoming'} shows={following!.upcoming} />
          </UpcomingWrapper>
        )}
      </Wrapper>
    )
  }
}

export const UpcomingPage = requireLogin<Props>(
  inject('following')(observer(UpcomingPageComponent))
)

const UpcomingWrapper = styled.div`
  width: 80%;
`

const Loading = styled.div`
  text-align: center;
`

const Wrapper = styled.div`
  margin-top: 70px;
  height: 100%;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
