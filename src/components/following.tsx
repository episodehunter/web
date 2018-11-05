import { withNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media-queries'
import { ShowWithEpisodesToWatch } from '../utils/firebase-db'
import { ShowCard } from './show-card/show-card'

type Props = {
  following: ShowWithEpisodesToWatch[]
}

const Following = ({ following }: Props) => (
  <FollowingWrapper>
    {following.map(show => (
      <ShowCard
        key={show.id}
        showId={show.id}
        tvdbId={show.ids.tvdb}
        topRight={show.name}
        bottomRight={episodeLeftText(show.episodesToWatch.length)}
      />
    ))}
  </FollowingWrapper>
)

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
