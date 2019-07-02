import React from 'react'
import styled from 'styled-components'
import { Dragonstone } from '@episodehunter/types'
import { media } from '../styles/media-queries'
import { UpcomingEpisodeCard } from './poster-cards/upcoming-episode-card'
import { UpcomingShow } from '../types/upcoming'

type Props = {
  title: string
  shows: UpcomingShow[]
  episodeKey: 'upcomingEpisode' | 'justAirdEpisode'
}

export const Upcoming = ({ title, shows, episodeKey }: Props) => {
  if (!shows.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowsWrapper>
        {shows.map(show => (
          <UpcomingEpisodeCard
            key={show.ids.id}
            episodeAirDate={formatEpisodeAirDate(show.ended, show[episodeKey])}
            showId={show.ids.id}
            tvdbId={show.ids.tvdb}
            showName={show.name}
          />
        ))}
      </ShowsWrapper>
    </UpcomingWrapper>
  )
}

export const formatEpisodeAirDate = (
  ended: boolean,
  episode: Pick<Dragonstone.Episode, 'aired'> | null
) => {
  if (episode) {
    return episode.aired
  } else if (ended) {
    return 'Ended'
  } else {
    return 'TBA'
  }
}

const ShowsWrapper = styled.div`
  display: grid;
  ${media.giant`grid-template-columns: repeat(6, 1fr);`};
  ${media.desktop`grid-template-columns: repeat(6, 1fr);`};
  ${media.tablet`grid-template-columns: repeat(4, 1fr);`};
  grid-template-columns: 1fr;
`

const UpcomingWrapper = styled.div`
  margin-bottom: 40px;
`

const Timespan = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
