import * as React from 'react'
import styled from 'styled-components'
import { Episode as EpisodeType } from '../../store/episode'
import { images } from '../../images.config'
import { alabaster } from '../../utils/colors'
import { zeroPad } from '../../utils/number'

type Props = {
  episode: EpisodeType
}
export const Episode = ({ episode }: Props) => (
  <EpisodeWrapper>
    <PosterWrapper>
      <Poster src={images.episode.small(episode.tvdbId)} />
    </PosterWrapper>
    <DescriptionWrapper>
      <Name>{zeroPad(episode.episode) + ' ' + episode.name}</Name>
    </DescriptionWrapper>
  </EpisodeWrapper>
)

const EpisodeWrapper = styled.div`
  margin: 10px;
`

const PosterWrapper = styled.div``
const DescriptionWrapper = styled.div``

const Name = styled.div`
  font-size: 12px;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  margin-bottom: 10px;
`

const Poster = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  width: 100%;
`
