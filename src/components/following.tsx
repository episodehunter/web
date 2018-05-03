import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { observer } from 'mobx-react'
import { SmallShowPoster } from './poster/small-show-poster'

type Props = {
  following: Show[]
}

export const FollowingComponent = observer(({ following }: Props) => (
  <FollowingWrapper>
    {following.map(following => (
      <ShowWrapper key={following.id}>
        <SmallShowPoster tvdbId={following.tvdbId} />
      </ShowWrapper>
    ))}
  </FollowingWrapper>
))

const ShowWrapper = styled.div`
  margin: 20px;
`
const FollowingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 40px 25%;
`
