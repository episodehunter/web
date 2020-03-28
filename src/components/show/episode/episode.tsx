import React from 'react'
import { isMobile } from '../../../styles/media-queries'
import { SeasonEpisode } from '../../../types/episode'
import { episodeNumberToString } from '../../../utils/episode.util'
import { EllipsisText } from '../../ellipsis-text'
import { EpisodeImage } from '../../episode/episode-image'
import { H4 } from '../../atoms/typography'
import { HighlightSpan } from '../../atoms/highlight-span'
import { AirDate } from './air-date'
import { WatchedButton } from './watched-button'
import { WatchedEpisodeDate } from './watched-episode-date'
import { styled } from '@material-ui/core'

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
        width: '100%',
      }
    : {
        tvdbId,
        theTvDbShowId,
        style: { flexShrink: 0, borderRadius: 5 },
      }

const HeadlineWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 170px',
  gridColumnGap: '10px',
  marginBottom: '5px',
})

const EpisodeWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'normal',
  },
}))
const DescriptionWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
  margin: '20px',
  [theme.breakpoints.up('md')]: {
    margin: '0 0 0 20px',
  },
}))
