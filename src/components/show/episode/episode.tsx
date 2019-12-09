import React from 'react'
import styled from 'styled-components'
import { isMobile, media } from '../../../styles/media-queries'
import { SeasonEpisode } from '../../../types/episode'
import { episodeNumberToString } from '../../../utils/episode.util'
import { EllipsisText } from '../../ellipsis-text'
import { EpisodeImage } from '../../episode/episode-image'
import { H4 } from '../../atoms/Typography'
import { HighlightSpan } from '../../atoms/highlight-span'
import { AirDate } from './air-date'
import { WatchedButton } from './watched-button'
import { WatchedEpisodeDate } from './watched-episode-date'

interface Props {
  episode: SeasonEpisode
  theTvDbShowId: number
}

export const Episode = ({ episode, theTvDbShowId }: Props) => (
  <EpisodeWrapper>
    <EpisodeImage {...episodeImageProps(episode.ids.tvdb, theTvDbShowId)}>
      <WatchedEpisodeDate watched={episode.watched} />
    </EpisodeImage>

    <DescriptionWrapper>
      <HeadlineWrapper>
        <div>
          <H4 style={{ margin: '0px 0px 4px 0px' }}>
            <HighlightSpan>{episodeNumberToString(episode.episodenumber)}</HighlightSpan>{' '}
            {episode.name}
          </H4>
          <AirDate firstAired={episode.aired} />
        </div>
        <WatchedButton episode={episode} />
      </HeadlineWrapper>
      <EllipsisText length={350} style={{ margin: '7.5px 0 0 0' }}>
        {episode.overview}
      </EllipsisText>
    </DescriptionWrapper>
  </EpisodeWrapper>
)

const episodeImageProps = (tvdbId: number, theTvDbShowId: number) =>
  isMobile()
    ? {
        tvdbId,
        theTvDbShowId,
        width: '100%'
      }
    : {
        tvdbId,
        theTvDbShowId,
        style: { flexShrink: 0, borderRadius: 5 }
      }

const HeadlineWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 170px;
  grid-column-gap: 10px;
  margin-bottom: 5px;
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
