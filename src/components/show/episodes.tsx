import * as React from 'react'
import styled from 'styled-components'
import { Episode } from './episode'
import { Episode as EpisodeModel } from '../../store/episode'
import { media } from '../../styles/media-queries'

type Props = {
  episodes: EpisodeModel[]
}

export const Episodes = ({ episodes }: Props) => (
  <Wrapper>
    {episodes.map(episode => (
      <Episode key={episode.tvdbId} episode={episode} />
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: grid;
  ${media.giant`grid-template-columns: repeat(8, 1fr);`};
  ${media.desktop`grid-template-columns: repeat(6, 1fr);`};
  ${media.tablet`grid-template-columns: repeat(4, 1fr);`};
  grid-template-columns: repeat(2, 1fr);
`
