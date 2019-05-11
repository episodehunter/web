import React from 'react'
import styled from 'styled-components'
import { Dragonstone } from '@episodehunter/types'
import { ShowAndEpisode } from '../store/upcoming-episodes.store'
import { media } from '../styles/media-queries'
import { UpcomingEpisodeCard } from './poster-cards/upcoming-episode-card'

type Props = {
  title: string
  showsWithEpisode: ShowAndEpisode[]
}

export const Upcoming = ({ title, showsWithEpisode }: Props) => {
  if (!showsWithEpisode.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowsWrapper>
        {showsWithEpisode.map(({ show, episode }) => (
          <UpcomingEpisodeCard
            key={show.data.ids.id}
            episodeAirDate={formatEpisodeAirDate(show.data.ended, episode)}
            showId={show.data.ids.id}
            tvdbId={show.data.ids.tvdb}
            showName={show.data.name}
          />
        ))}
      </ShowsWrapper>
    </UpcomingWrapper>
  )
}

export const formatEpisodeAirDate = (ended: boolean, episode?: Dragonstone.Episode) => {
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
