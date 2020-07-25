import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import React from 'react'

type Props = {
  imagePath: string
  defaultImage?: string
}

const style = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  transition: 'background-image 0.4s linear',
}

export const Fanart = ({
  imagePath,
  defaultImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
}: Props) => (
  <LazyLoadBackgroundImage
    width="100%"
    height="100%"
    style={style}
    defaultImage={defaultImage}
    image={imagePath}
  />
)
