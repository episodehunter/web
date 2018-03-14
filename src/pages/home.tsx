import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
import { User } from '../store/user'
import { Following } from '../components/following'
import { Spinner } from '../components/spinner'
import { Navbar } from '../components/navbar'

type Props = {
  user?: User
}

export class HomePageComponent extends React.Component<Props> {
  componentWillMount() {
    this.props.user!.fetchUserInfo()
    this.props.user!.fetchFollowing()
  }

  render() {
    return (
      <Wrapper>
        <Navbar />
        {this.props.user!.loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <Following following={this.props.user!.following} />
        )}
      </Wrapper>
    )
  }
}

export const HomePage = requireLogin<Props>(
  inject('user')(observer(HomePageComponent))
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
