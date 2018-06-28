import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import React from 'react'
import { images } from '../../images.config'

type Props = {
  tvdbId: number
  children: JSX.Element | JSX.Element[]
  style?: any
}

export const EpisodeImage = ({ tvdbId, children, style }: Props) => (
  <>
    <LazyLoadBackgroundImage
      width={250}
      height={140}
      style={{
        borderRadius: 5,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        ...style
      }}
      defaultImage={`https://www.placecage.com/g/${250}/${140}`}
      image={images.episode.small(tvdbId)}
    >
      {children}
    </LazyLoadBackgroundImage>
  </>
)
