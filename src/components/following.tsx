import { withNavigation } from '@vieriksson/the-react-router'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { media } from '../styles/media-queries'
import { PosterCard } from './poster-cards/poster-card'
import { SmallShowPoster } from './poster/small-show-poster'

type Props = {
  following: Show[]
}

const Following = observer(({ following }: Props) => (
  <FollowingWrapper>
    {following.map(
      show =>
        show && (
          <PosterCard
            key={show.id}
            linkUrl={`/show/${show.id}`}
            poster={<SmallShowPoster tvdbId={show.tvdbId} />}
            topRight={show.name}
            bottomRight={show.numberOfEpisodeToWatch}
          />
        )
    )}
  </FollowingWrapper>
))

export const FollowingComponent = withNavigation(Following)

const FollowingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`
