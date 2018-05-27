import * as React from 'react'
import { Episode as EpisodeType } from '../../store/episode'
import { dateReleaseFormat } from '../../utils/date.utils'
import { EpisodeImage } from '../episode/episode-image'
import { P2 } from '../text'

type Props = {
  episode: EpisodeType | null
}

export const NextEpisode = ({ episode }: Props) =>
  episode && (
    <EpisodeImage tvdbId={episode.tvdbId}>
      <P2 margin={0}>
        {episode.seasonAndEpisodeNumber} {episode.name}
      </P2>
      <P2 margin={0}>{dateReleaseFormat(episode.firstAired)}</P2>
    </EpisodeImage>
  )
