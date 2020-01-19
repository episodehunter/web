import React from 'react'
import { Dragonstone } from '@episodehunter/types'
import { UpcomingShow } from '../types/upcoming'
import { ShowCard } from './show-card/show-card'
import { dateReleaseFormat, parse } from '../utils/date.utils'
import { ShowListWrapper } from './atoms/show-list-wrapper'
import { Margin } from './atoms/margin'
import { H2 } from './atoms/typography'

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
    <Margin bottom={40}>
      <H2>{title}</H2>
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
    </Margin>
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
