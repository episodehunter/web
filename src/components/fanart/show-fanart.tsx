import { createElement } from 'react'
import { images } from '../../images.config'
import { Fanart } from './fanart'

type Props = {
  tvdbId: number
}

export const ShowFanart = ({ tvdbId }: Props) =>
  createElement(Fanart, { imagePath: images.fanart.big(tvdbId) })
