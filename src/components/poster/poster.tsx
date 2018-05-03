import * as React from 'react'
import { LazyLoadImage } from '@tjoskar/react-lazyload-img'

type Props = {
  width: number
  height: number
  imagePath: string
}

export const Poster = ({ height, width, imagePath }: Props) => (
  <LazyLoadImage
    width={width}
    height={height}
    defaultImage={`https://www.placecage.com/g/${width}/${height}`}
    image={imagePath}
  />
)
