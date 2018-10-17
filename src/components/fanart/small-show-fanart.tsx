import { LazyLoadImage } from '@tjoskar/react-lazyload-img';
import React from 'react';
import { images } from '../../images.config';

type Props = {
  tvdbId: number
  scale?: number
}

export const SmallShowFanart = ({ tvdbId }: Props) => {
  const width = '100%'
  const height = 200
  return Boolean(tvdbId) ? (
    <LazyLoadImage
      width={width}
      height={height}
      defaultImage={`https://www.placecage.com/g/${356}/${height}`}
      image={images.fanart.big(tvdbId)}
    />
  ) : null
}
