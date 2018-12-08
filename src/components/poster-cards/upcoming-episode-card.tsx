import React from 'react'
import { ShowCard } from '../show-card/show-card'

type Props = {
  showId: string
  tvdbId: number
  showName: string
  episodeAirDate: string
}

export const UpcomingEpisodeCard = ({
  episodeAirDate,
  showId,
  tvdbId,
  showName
}: Props) => (
  <ShowCard
    showId={showId}
    tvdbId={tvdbId}
    topRight={showName}
    bottomRight={episodeAirDate}
  />
)
