import * as React from 'react'
import { images } from '../../images.config'
import { Poster } from './poster'

type Props = {
  tvdbId: number
  scale?: number
}

export const SmallShowPoster = ({ tvdbId, scale }: Props) => {
  const width = 185 * (scale || 1)
  const height = 273 * (scale || 1)
  return Boolean(tvdbId) ? (
    <Poster
      style={{ flexShrink: 0 }}
      width={width}
      height={height}
      imagePath={images.poster.small(tvdbId)}
    />
  ) : null
}
