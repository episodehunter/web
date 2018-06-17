import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Show } from '../../store/show'
import { Today, dateReleaseFormat } from '../../utils/date.utils'
import { composeHOC } from '../../utils/function.util'
import { EpisodeImage } from '../episode/episode-image'
import { P2 } from '../text'

type Props = {
  show: Show
  today?: Today
}

const NextEpisodeComponent = ({ show, today }: Props) => {
  if (!show.nextEpisodeToWatch) {
    return null
  }
  return (
    <EpisodeImage tvdbId={show.nextEpisodeToWatch.tvdbId}>
      <P2 margin={0}>
        {show.nextEpisodeToWatch.seasonAndEpisodeNumber}{' '}
        {show.nextEpisodeToWatch.name}
      </P2>
      <P2 margin={0}>
        {dateReleaseFormat(
          show.nextEpisodeToWatch.firstAired,
          { future: date => `Airs ${date}`, past: date => `Aird ${date}` },
          (today as Today)()
        )}
      </P2>
    </EpisodeImage>
  )
}

export const NextEpisode = composeHOC<Props>(inject('today'), observer)(
  NextEpisodeComponent
)
