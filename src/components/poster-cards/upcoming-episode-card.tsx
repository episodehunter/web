import { observer } from 'mobx-react'
import * as React from 'react'
import { ddmmm } from '../../utils/date.utils'
import { SmallShowPoster } from '../poster/small-show-poster'
import { PosterCard } from './poster-card'

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
  <PosterCard
    linkUrl={`/show/${showId}`}
    poster={<SmallShowPoster tvdbId={tvdbId} />}
    topRight={showName}
    bottomRight={formatEpisodeAirDate(episodeAirDate)}
  />
)

export const formatEpisodeAirDate = (episodeAirDate: Date | null) =>
  episodeAirDate ? ddmmm(episodeAirDate) : 'TBA'

export const UpcomingEpisodeCard = observer(UpcomingEpisodeCardComponent)
