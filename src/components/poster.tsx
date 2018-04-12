import * as React from 'react'
import styled from 'styled-components'
import { images } from '../images.config'

type Props = {
  tvdbId: number
  zoom?: boolean
}
export const Poster = ({ tvdbId, zoom }: Props) => (
  <Wrapper zoom={zoom}>
    <Image src={images.poster.small(tvdbId)} />
  </Wrapper>
)

const Image = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  width: 100%;
`
const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  ${(props: { zoom?: boolean }) =>
    props.zoom
      ? `transition: 0.3s ease-in-out;
  &:hover {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }`
      : ''};
`
