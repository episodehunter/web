import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import React from 'react'
import { images } from '../../images.config'

type Props = {
  tvdbId: number
  theTvDbShowId: number
  children: JSX.Element | JSX.Element[]
  width?: string | number
  height?: string | number
  style?: any
}

export const EpisodeImage = ({
  tvdbId,
  theTvDbShowId,
  width = 250,
  height = 140,
  children,
  style,
}: Props) => (
  <>
    <LazyLoadBackgroundImage
      width={width}
      height={height}
      style={{
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        ...style,
      }}
      defaultImage={images.fanart.big(theTvDbShowId)}
      image={images.episode.small(tvdbId)}
    >
      {children}
    </LazyLoadBackgroundImage>
  </>
)
