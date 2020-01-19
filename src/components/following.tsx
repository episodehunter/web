import React from 'react'
import { FollowingShow } from '../types/following'
import { ShowListWrapper } from './atoms/show-list-wrapper'
import { H1 } from './atoms/typography'
import { ShowCard } from './show-card/show-card'

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
