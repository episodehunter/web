import { LazyLoadImage } from '@tjoskar/react-lazyload-img';
import React from 'react';
import { images } from '../../images.config';

type Props = {
  tvdbId: number
}

export const SmallShowFanart = ({ tvdbId }: Props) => {
  const width = '100%'
  return Boolean(tvdbId) ? (
    <LazyLoadImage
      width={width}
      height='auto'
      defaultImage={`https://www.placecage.com/g/${356}/${200}`}
      image={images.fanart.big(tvdbId)}
    />
  ) : null
}
