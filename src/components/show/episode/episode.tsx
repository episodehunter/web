import React from 'react';
import styled from 'styled-components';
import { isMobile, media } from '../../../styles/media-queries';
import { composeSeasonAndEpisodeNumber } from '../../../utils/episode.util';
import { Episode as EpisodeModel, WatchedEpisode } from '../../../utils/firebase/types';
import { EllipsisText } from '../../ellipsis-text';
import { EpisodeImage } from '../../episode/episode-image';
import { H4, HighlightSpan } from '../../text';
import { AirDate } from './air-date';
import { WatchedButton } from './watched-button';
import { WatchedEpisodeDate } from './watched-episode-date';

type Props = {
  episode: EpisodeModel
  watched: WatchedEpisode | undefined
  showId: string
}

export const Episode = ({ episode, watched, showId }: Props) => (
  <EpisodeWrapper>
    <EpisodeImage {...episodeImageProps(episode.tvdbId)}>
      <WatchedEpisodeDate watched={watched} />
    </EpisodeImage>

    <DescriptionWrapper>
      <HeadlineWrapper>
        <H4 margin={0}>
          <HighlightSpan>{composeSeasonAndEpisodeNumber(episode.season, episode.episode)}</HighlightSpan>{' '}
          {episode.name}
        </H4>
        <WatchedButton showId={showId} watched={watched} episode={episode} />
      </HeadlineWrapper>
      <AirDate firstAired={episode.aired} />
      <EllipsisText length={350} style={{ margin: '7.5px 0 0 0' }}>
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
