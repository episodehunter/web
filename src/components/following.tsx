import React from 'react'
import { ShowCard } from './show-card/show-card'
import { H1 } from './text'
import { FollowingShow } from '../types/following'
import { ShowListWrapper } from './atoms/show-list-wrapper'

interface Props {
  shows: FollowingShow[]
}

export const Following = ({ shows }: Props) => (
  <>
    <H1>Following</H1>
    <ShowListWrapper>
      {shows.map(show => (
        <ShowCard
          key={show.ids.id}
          showId={show.ids.id}
          tvdbId={show.ids.tvdb}
          showName={show.name}
          bottomText={episodeLeftText(show.nextToWatch.numberOfEpisodesToWatch)}
        />
      ))}
    </ShowListWrapper>
  </>
)

export const episodeLeftText = (n: number) => {
  if (n === 0) {
    return `You're all caught up!`
  }
  return `You have ${n} episodes left`
}
