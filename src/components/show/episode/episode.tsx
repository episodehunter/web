import React from 'react'
import styled from 'styled-components'
import { Episode as EpisodeType } from '../../../store/episode'
import { isMobile, media } from '../../../styles/media-queries'
import { EllipsisText } from '../../ellipsis-text'
import { EpisodeImage } from '../../episode/episode-image'
import { H4, HighlightSpan } from '../../text'
import { AirDate } from './air-date'
import { WatchedButton } from './watched-button'
import { WatchedEpisodeDate } from './watched-episode-date'

type Props = {
  episode: EpisodeType
}

export const Episode = ({ episode }: Props) => (
  <EpisodeWrapper>
    <EpisodeImage {...episodeImageProps(episode.tvdbId)}>
      <WatchedEpisodeDate episode={episode} />
    </EpisodeImage>

    <DescriptionWrapper>
      <HeadlineWrapper>
        <H4 margin={0}>
          <HighlightSpan>{episode.seasonAndEpisodeNumber}</HighlightSpan>{' '}
          {episode.name}
        </H4>
        <WatchedButton episode={episode} />
      </HeadlineWrapper>
      <AirDate firstAired={episode.firstAired} />
      <EllipsisText length={350} style={{ margin: '10px 0 0 0' }}>
        {episode.overview}
      </EllipsisText>
    </DescriptionWrapper>
  </EpisodeWrapper>
)

const episodeImageProps = tvdbId =>
  isMobile()
    ? {
        tvdbId,
        width: '100%'
      }
    : {
        tvdbId,
        style: { flexShrink: 0, borderRadius: 5 }
      }

const HeadlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const EpisodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  ${media.tabletAndUp`
    flex-direction: row;
    align-items: normal;
  `};
`
const DescriptionWrapper = styled.div`
  flex-grow: 1;
  margin: 20px;
  ${media.tabletAndUp`
    margin: 0 0 0 20px;
  `};
`
