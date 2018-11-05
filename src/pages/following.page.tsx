import React from 'react'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import styled from 'styled-components'
import { FollowingComponent } from '../components/following'
import { shark } from '../utils/colors'
import { episodesToWatch$, ShowWithEpisodesToWatch } from '../utils/firebase-db'
import { SpinnerPage } from './spinner.page'

type State = {
  shows: ShowWithEpisodesToWatch[]
  loading: boolean
}

export class FollowingPage extends React.Component<{}, State> {
  private subscribtion: Subscription
  state = {
    shows: [],
    loading: true
  }

  componentDidMount() {
    this.subscribtion = episodesToWatch$
      .pipe(
        map(shows => {
          return shows.sort((a, b) => {
            const aCaughtUp = a.episodesToWatch.length === 0
            const bCaughtUp = b.episodesToWatch.length === 0
            const aEndedAndCaughtUp = a.ended && aCaughtUp
            const bEndedAndCaughtUp = b.ended && bCaughtUp
            if (aEndedAndCaughtUp && bEndedAndCaughtUp) {
              return 0
            } else if (aEndedAndCaughtUp) {
              return 1
            } else if (bEndedAndCaughtUp) {
              return -1
            } else if (aCaughtUp && bCaughtUp) {
              return 0
            } else if (aCaughtUp) {
              return 1
            } else if (bCaughtUp) {
              return -1
            }
            return (
              b.episodesToWatch[b.episodesToWatch.length - 1].aired.getTime() -
              a.episodesToWatch[a.episodesToWatch.length - 1].aired.getTime()
            )
          })
        })
      )
      .subscribe(shows => {
        this.setState({
          loading: false,
          shows
        })
      })
  }

  componentWillUnmount() {
    this.subscribtion.unsubscribe()
  }

  render() {
    return this.state.loading ? (
      <SpinnerPage />
    ) : (
      <Wrapper>
        <FollowingComponent following={this.state.shows} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background-color: ${shark};
  display: flex;
  justify-content: center;
  padding-top: 70px;
`
