import * as React from 'react'
import styled from 'styled-components'
import { LazyLoadImage } from '@tjoskar/react-lazyload-img'
import { images } from '../images.config'

type Props = {
  tvdbId: number
  zoom?: boolean
}
export const Poster = ({ tvdbId, zoom }: Props) => (
  <Wrapper zoom={zoom}>
    <LazyLoadImage
      width="100%"
      height="auto"
      defaultImage="https://www.placecage.com/g/185/273"
      image={images.poster.small(tvdbId)}
    />
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  ${(props: { zoom?: boolean }) =>
    props.zoom
      ? `transition: 0.3s ease-in-out;
         &:hover {
          transform: scale(1.05);
         }`
      : ''};
`
