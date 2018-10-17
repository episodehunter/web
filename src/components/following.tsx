import { withNavigation } from '@vieriksson/the-react-router'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { media } from '../styles/media-queries'
import { ShowCard } from './show-card/show-card'

type Props = {
  following: Show[]
}

const Following = observer(({ following }: Props) => (
  <FollowingWrapper>
    {following.map(
      show =>
        show && (
          <ShowCard
            key={show.id}
            showId={show.id}
            tvdbId={show.tvdbId}
            topRight={show.name}
            bottomRight={episodeLeftText(show.numberOfEpisodeToWatch)}
          />
        )
    )}
  </FollowingWrapper>
))

export const episodeLeftText = (n: number) => {
  if (n === 0) {
    return `You're all caught up!`
  }
  return `You have ${n} episodes left`
}

export const FollowingComponent = withNavigation(Following)

const FollowingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  ${media.mobile`
    grid-template-columns: 1fr;
  `};
  width: 95%;
`
