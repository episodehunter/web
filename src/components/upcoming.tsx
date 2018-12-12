import React from 'react';
import styled from 'styled-components';
import { Episode, ShowAndUpcomingEpisodes } from '../model';
import { media } from '../styles/media-queries';
import { ddmmm } from '../utils/date.utils';
import { UpcomingEpisodeCard } from './poster-cards/upcoming-episode-card';

type Props = {
  title: string
  shows: ShowAndUpcomingEpisodes[]
  extractEpisode: (show: ShowAndUpcomingEpisodes) => Episode | null
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
            key={show.show.ids.id}
            episodeAirDate={formatEpisodeAirDate(
              show.show.ended,
              extractEpisode(show)
            )}
            showId={show.show.ids.id}
            tvdbId={show.show.ids.tvdb}
            showName={show.show.name}
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
