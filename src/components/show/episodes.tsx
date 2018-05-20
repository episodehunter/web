import * as React from 'react'
import styled from 'styled-components'
import { Episode as EpisodeModel } from '../../store/episode'
import { Episode } from './episode'

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
  display: flex;
  flex-direction: column;
`
