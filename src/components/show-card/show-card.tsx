import React from 'react'
import { isMobile } from '../../styles/media-queries'
import { SmallShowFanart } from '../fanart/small-show-fanart'
import { PosterCard } from '../poster-cards/poster-card'
import { SmallShowPoster } from '../poster/small-show-poster'

type Props = {
  showId: number
  tvdbId: number
  topRight?: JSX.Element | string
  bottomRight?: JSX.Element | string
}

export const ShowCard = ({ showId, tvdbId, bottomRight, topRight }: Props) => {
  const ImageContainer = getImageContainer()
  return (
    <PosterCard
      linkUrl={`/show/${showId}/${tvdbId}`}
      poster={<ImageContainer tvdbId={tvdbId} />}
      topRight={topRight}
      bottomRight={bottomRight}
    />
  )
}

function getImageContainer() {
  return isMobile() ? SmallShowFanart : SmallShowPoster
}
