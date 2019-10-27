import { LazyLoadImage } from '@tjoskar/react-lazyload-img'
import React from 'react'
import { images } from '../../images.config'

type Props = {
  tvdbId: number
}

export const SmallShowFanart = ({ tvdbId }: Props) => {
  const width = '100%'
  return Boolean(tvdbId) ? (
    <LazyLoadImage
      width={width}
      height="auto"
      defaultImage="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      image={images.fanart.big(tvdbId)}
    />
  ) : null
}
