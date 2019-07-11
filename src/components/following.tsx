import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media-queries'
import { ShowCard } from './show-card/show-card'
import { H1 } from './text'
import { Show } from '../types/show'

interface Props {
  shows: Show[]
}

export const Following = ({ shows }: Props) => (
  <Wrapper>
    <H1>Following</H1>
    <FollowingWrapper>
      {shows.map(show => (
        <ShowCard
          key={show.ids.id}
          showId={show.ids.id}
          tvdbId={show.ids.tvdb}
          topRight={show.name}
          bottomRight={episodeLeftText(show.nextToWatch.numberOfEpisodesToWatch)}
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
