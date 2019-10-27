import React from 'react'
import { LazyLoadImage } from '@tjoskar/react-lazyload-img'

type Props = {
  width: number
  height: number
  imagePath: string
  style?: React.CSSProperties
}

export const Poster = ({ height, width, imagePath, style }: Props) => (
  <LazyLoadImage
    style={style}
    width={width}
    height={height}
    defaultImage="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    image={imagePath}
  />
)
