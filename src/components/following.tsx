import React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { media } from '../styles/media-queries'
import { ShowCard } from './show-card/show-card'
import { H1 } from './text'

type Props = {
  following: { show: Show; numberOfEpisodesToWatch: number }[]
}

export const Following = ({ following }: Props) => (
  <Wrapper>
    <H1>Following</H1>
    <FollowingWrapper>
      {following.map(({ show, numberOfEpisodesToWatch }) => (
        <ShowCard
          key={show.data.ids.id}
          showId={show.data.ids.id}
          tvdbId={show.data.ids.tvdb}
          topRight={show.data.name}
          bottomRight={episodeLeftText(numberOfEpisodesToWatch)}
        />
      ))}
    </FollowingWrapper>
  </Wrapper>
)

export const episodeLeftText = (n: number) => {
  if (n === 0) {
    return `You're all caught up!`
  }
  return `You have ${n} episodes left`
}

const FollowingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  ${media.mobile`
    grid-template-columns: 1fr;
  `};
`

const Wrapper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`
