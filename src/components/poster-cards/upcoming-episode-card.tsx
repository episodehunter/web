import { observer } from 'mobx-react'
import React from 'react'
import { ddmmm } from '../../utils/date.utils'
import { ShowCard } from '../show-card/show-card'

type Props = {
  showId: number
  tvdbId: number
  showName: string
  episodeAirDate: Date | null
}

export const UpcomingEpisodeCardComponent = ({
  episodeAirDate,
  showId,
  tvdbId,
  showName
}: Props) => (
  <ShowCard
    showId={showId}
    tvdbId={tvdbId}
    topRight={showName}
    bottomRight={formatEpisodeAirDate(episodeAirDate)}
  />
)

export const formatEpisodeAirDate = (episodeAirDate: Date | null) =>
  episodeAirDate ? ddmmm(episodeAirDate) : 'TBA'

export const UpcomingEpisodeCard = observer(UpcomingEpisodeCardComponent)
