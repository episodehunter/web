import { inject } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Episode as EpisodeType } from '../../store/episode'
import { Today, dateReleaseFormat, format } from '../../utils/date.utils'
import { EllipsisText } from '../ellipsis-text'
import { EpisodeImage } from '../episode/episode-image'
import { H4, HighlightSpan, P, SmallText } from '../text'

type Props = {
  episode: EpisodeType
  today?: Today
}

export const EpisodeComponent = ({ episode, today }: Props) => (
  <EpisodeWrapper>
    <EpisodeImage tvdbId={episode.tvdbId} style={{ flexShrink: 0 }}>
      <P
        margin={0}
        title={`You wached this episode at ${format(
          episode.firstAired,
          'Do MMM YYYY'
        )}`}
      >
        ✅ {dateReleaseFormat(episode.firstAired)}
      </P>
    </EpisodeImage>
    <DescriptionWrapper>
      <H4 margin={0}>
        <HighlightSpan>{episode.seasonAndEpisodeNumber}</HighlightSpan>{' '}
        {episode.name}
      </H4>
      <Air firstAired={episode.firstAired} today={today as Today} />
      <EllipsisText length={350} style={{ margin: '10px 0 0 0' }}>
        {episode.overview}
      </EllipsisText>
    </DescriptionWrapper>
  </EpisodeWrapper>
)

export const Episode = inject('today')(EpisodeComponent)

const Air = ({
  firstAired,
  today
}: {
  firstAired: Date | null
  today: Today
}) => {
  return (
    <SmallText>
      {dateReleaseFormat(
        firstAired,
        { future: date => `📅 Airs ${date}`, past: date => `📅 Aird ${date}` },
        today()
      )}
    </SmallText>
  )
}

const EpisodeWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const DescriptionWrapper = styled.div`
  margin-left: 20px;
`
