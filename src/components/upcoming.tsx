import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { media } from '../styles/media-queries'
import { UpcomingEpisodeCard } from './poster-cards/upcoming-episode-card'

type Props = {
  title: string
  shows: Show[]
  extractEpisodeAirDate: (show: Show) => Date | null
}

export const UpcomingComponent = ({
  title,
  shows,
  extractEpisodeAirDate
}: Props) => {
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
            episodeAirDate={extractEpisodeAirDate(show)}
            showId={show.id}
            tvdbId={show.tvdbId}
            showName={show.name}
          />
        ))}
      </ShowsWrapper>
    </UpcomingWrapper>
  )
}

export const Upcoming = observer(UpcomingComponent)

const ShowsWrapper = styled.div`
  display: grid;
  ${media.giant`grid-template-columns: repeat(6, 1fr);`};
  ${media.desktop`grid-template-columns: repeat(6, 1fr);`};
  ${media.tablet`grid-template-columns: repeat(4, 1fr);`};
  grid-template-columns: repeat(2, 1fr);
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
