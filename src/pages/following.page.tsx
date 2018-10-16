import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { FollowingComponent } from '../components/following'
import { Following } from '../store/following'
import { shark } from '../utils/colors'
import { SpinnerPage } from './spinner.page'

type Props = {
  following: Following
}

export class FollowingPageComponent extends React.Component<Props> {
  render() {
    return this.props.following.isLoading ? (
      <SpinnerPage />
    ) : (
      <Wrapper>
        <FollowingComponent following={this.props.following.shows} />
      </Wrapper>
    )
  }
}

export const FollowingPage = inject('following')(
  observer(FollowingPageComponent)
)

const Wrapper = styled.div`
  background-color: ${shark};
  display: flex;
  justify-content: center;
  padding-top: 70px;
`
