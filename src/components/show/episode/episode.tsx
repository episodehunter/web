import React from 'react'
import styled from 'styled-components'
import { Episode as EpisodeType } from '../../../store/episode'
import { EllipsisText } from '../../ellipsis-text'
import { EpisodeImage } from '../../episode/episode-image'
import { H4, HighlightSpan } from '../../text'
import { AirDate } from './air-date'
import { WatchedEpisodeDate } from './watched-episode-date'

type Props = {
  episode: EpisodeType
}

export const Episode = ({ episode }: Props) => (
  <EpisodeWrapper>
    <EpisodeImage tvdbId={episode.tvdbId} style={{ flexShrink: 0 }}>
      <WatchedEpisodeDate episode={episode} />
    </EpisodeImage>

    <DescriptionWrapper>
      <H4 margin={0}>
        <HighlightSpan>{episode.seasonAndEpisodeNumber}</HighlightSpan>{' '}
        {episode.name}
      </H4>
      <AirDate firstAired={episode.firstAired} />
      <EllipsisText length={350} style={{ margin: '10px 0 0 0' }}>
        {episode.overview}
      </EllipsisText>
    </DescriptionWrapper>
  </EpisodeWrapper>
)

const EpisodeWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const DescriptionWrapper = styled.div`
  margin-left: 20px;
`
