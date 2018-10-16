import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { FollowingComponent } from '../components/following'
import { Following } from '../store/following'
import { WatchedHistory } from '../types'
import { shark } from '../utils/colors'
import { findBest } from '../utils/iterable.util'
import { SpinnerPage } from './spinner.page'

type Props = {
  following: Following
}

export class FollowingPageComponent extends React.Component<Props> {
  @computed
  get isLoading() {
    return (
      this.props.following.isLoading ||
      this.shows.some(show => show.loader.isFetching)
    )
  }

  @computed
  get shows() {
    return this.props.following.shows.sort((a, b) => {
      const awh = findBest<WatchedHistory>((pe, ce) => ce.time > pe.time)(
        a.watchHistory
      )
      if (awh === undefined) {
        return 1
      }
      const bwh = findBest<WatchedHistory>((pe, ce) => ce.time > pe.time)(
        b.watchHistory
      )
      if (bwh === undefined) {
        return -1
      }
      return bwh.time > awh.time ? 1 : -1
    })
  }

  render() {
    return this.isLoading ? (
      <SpinnerPage />
    ) : (
      <Wrapper>
        <FollowingComponent following={this.shows} />
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
