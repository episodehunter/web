import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { observer } from 'mobx-react'
import { SmallShowPoster } from './poster/small-show-poster'
import { media } from '../styles/media-queries'
import { withNavigation } from '../router/withNavigation'
import { PosterCard } from './poster-cards/poster-card'

type Props = {
  following: Show[]
}

const Following = observer(({ following }: Props) => (
  <FollowingWrapper>
    {following.map(following => (
      <ShowWrapper key={following.id}>
        <PosterCard
          linkUrl={`/show/${following.id}`}
          poster={<SmallShowPoster tvdbId={following.tvdbId} />}
          topRight={following.name}
          bottomRight={'5 left'}
        />
      </ShowWrapper>
    ))}
  </FollowingWrapper>
))

export const FollowingComponent = withNavigation(Following)

const ShowWrapper = styled.div`
  margin: 5px;
  cursor: pointer;
`

const FollowingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`
