import { createElement } from 'react'
import { images } from '../../images.config'
import { Fanart } from './fanart'

type Props = {
  tvdbId: number | string
}

export const ShowFanart = ({ tvdbId }: Props) =>
  tvdbId ? createElement(Fanart, { imagePath: images.fanart.big(tvdbId) }) : null
