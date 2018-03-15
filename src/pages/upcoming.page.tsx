import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
import { Spinner } from '../components/spinner'
import { FollowingComponent } from '../components/following'
import { Following } from '../store/following'

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
    return (
      <Wrapper>
        {this.props.following!.loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <FollowingComponent following={this.props.following!.following} />
        )}
      </Wrapper>
    )
  }
}

export const UpcomingPage = requireLogin<Props>(
  inject('following')(observer(UpcomingPageComponent))
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
