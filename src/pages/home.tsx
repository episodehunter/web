import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
import { Spinner } from '../components/spinner'
import { Navbar } from '../components/navbar'
import { FollowingComponent } from '../components/following'
import { Following } from '../store/following'

type Props = {
  following?: Following
}

export class HomePageComponent extends React.Component<Props> {
  componentWillMount() {
    this.props.following!.fetch()
  }

  render() {
    return (
      <Wrapper>
        <Navbar />
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

export const HomePage = requireLogin<Props>(
  inject('following')(observer(HomePageComponent))
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
