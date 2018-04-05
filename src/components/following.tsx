import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { Poster } from './poster'
import { observer } from 'mobx-react'

type Props = {
  following: Show[]
}
export const FollowingComponent = observer(({ following }: Props) => (
  <FollowingWrapper>
    {following.map(following => (
      <ShowWrapper key={following.id}>
        <Poster tvdbId={following.tvdbId} />
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
