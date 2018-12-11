import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media-queries'
import { ddmmm } from '../utils/date.utils'
import { Episode, ShowWithUpcomingEpisodes } from '../utils/firebase/types'
import { UpcomingEpisodeCard } from './poster-cards/upcoming-episode-card'

type Props = {
  title: string
  shows: ShowWithUpcomingEpisodes[]
  extractEpisode: (show: ShowWithUpcomingEpisodes) => Episode | null
}

export const Upcoming = ({ title, shows, extractEpisode }: Props) => {
  if (!shows.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowsWrapper>
        {shows.map(show => (
          <UpcomingEpisodeCard
            key={show.id}
            episodeAirDate={formatEpisodeAirDate(
              show.ended,
              extractEpisode(show)
            )}
            showId={show.id}
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
  episode: Episode | null
) => {
  if (episode) {
    return ddmmm(episode.aired)
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
