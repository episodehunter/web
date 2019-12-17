import React from 'react'
import styled from 'styled-components'
import { Dragonstone } from '@episodehunter/types'
import { UpcomingShow } from '../types/upcoming'
import { ShowCard } from './show-card/show-card'
import { dateReleaseFormat, parse } from '../utils/date.utils'
import { ShowListWrapper } from './atoms/show-list-wrapper'

type Props = {
  title: string
  shows: UpcomingShow[]
  episodeKey: 'upcomingEpisode' | 'justAirdEpisode'
  showDate: boolean
}

export const Upcoming = ({ title, shows, episodeKey, showDate }: Props) => {
  if (!shows.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowListWrapper>
        {shows.map(show => (
          <ShowCard
            key={show.ids.id}
            episodeName={show[episodeKey] && show[episodeKey]!.name}
            episodeNumber={show[episodeKey] && show[episodeKey]!.episodenumber}
            episodeAirDate={formatEpisodeAirDate(showDate, show[episodeKey])}
            showId={show.ids.id}
            tvdbId={show.ids.tvdb}
            showName={show.name}
          />
        ))}
      </ShowListWrapper>
    </UpcomingWrapper>
  )
}

export const formatEpisodeAirDate = (
  showDate: boolean,
  episode: Pick<Dragonstone.Episode, 'aired'> | null
) => {
  if (!showDate || !episode) {
    return null
  }
  return dateReleaseFormat(parse(episode.aired))
}

const UpcomingWrapper = styled.div`
  margin-bottom: 40px;
`

const Timespan = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
