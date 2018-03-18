import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { shark } from '../utils/colors'
import { Spinner } from '../components/spinner'
import { FollowingComponent } from '../components/following'
import { Following } from '../store/following'

type Props = {
  following?: Following
}

export class FollowingPageComponent extends React.Component<Props> {
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

export const FollowingPage = inject('following')(
  observer(FollowingPageComponent)
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
