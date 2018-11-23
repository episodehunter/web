import React from 'react'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import styled from 'styled-components'
import { FollowingComponent } from '../components/following'
import { shark } from '../utils/colors'
import { episodesToWatch$ } from '../utils/firebase/selectors'
import { Episode, Show, State } from '../utils/firebase/types'
import { sortShowsAfterEpisodesAirDate } from '../utils/firebase/util'
import { SpinnerPage } from './spinner.page'

type ComState = {
  shows: { show: Show; episodes: State<Episode[]> }[]
  loading: boolean
}

export class FollowingPage extends React.Component<{}, ComState> {
  private subscribtion: Subscription
  state = {
    shows: [],
    loading: true
  } as ComState

  componentDidMount() {
    this.subscribtion = episodesToWatch$
      .pipe(map(data => sortShowsAfterEpisodesAirDate(data)))
      .subscribe(shows => {
        this.setState({ shows, loading: false })
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
