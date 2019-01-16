import { withNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { Episode, Show } from '../model'
import { media } from '../styles/media-queries'
import { ShowCard } from './show-card/show-card'

type Props = {
  following: { show: Show; episodes: Episode[] }[]
}

const Following = ({ following }: Props) => (
  <FollowingWrapper>
    {following.map(({ show, episodes }) => (
      <ShowCard
        key={show.ids.id}
        showId={show.ids.id}
        tvdbId={show.ids.tvdb}
        topRight={show.name}
        bottomRight={episodeLeftText(episodes.length)}
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
