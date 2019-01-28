import React, { useState } from 'react'
import { map } from 'rxjs/operators'
import styled from 'styled-components'
import { FollowingComponent } from '../components/following'
import { shark } from '../utils/colors'
import { episodesToWatch$ } from '../utils/firebase/selectors'
import { sortShowsAfterEpisodesAirDate } from '../utils/firebase/util'
import { useObservable } from '../utils/use-observable'
import { SpinnerPage } from './spinner.page'

export const FollowingPage = () => {
  const [loading, setLoading] = useState(true)
  const shows = useObservable($shows, [], () => setLoading(false))
  return loading ? (
    <SpinnerPage />
  ) : (
    <Wrapper>
      <FollowingComponent following={shows} />
    </Wrapper>
  )
}

const $shows = episodesToWatch$.pipe(
  map(data => sortShowsAfterEpisodesAirDate(data))
)

const Wrapper = styled.div`
  background-color: ${shark};
  display: flex;
  justify-content: center;
  padding-top: 70px;
`
