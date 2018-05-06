import * as React from 'react'
import { images } from '../../images.config'
import { Poster } from './poster'

type Props = {
  tvdbId: number
}

export const SmallShowPoster = ({ tvdbId }: Props) =>
  Boolean(tvdbId) ? (
    <Poster width={185} height={273} imagePath={images.poster.small(tvdbId)} />
  ) : null
