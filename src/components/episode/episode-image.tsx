import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import * as React from 'react'
import styled from 'styled-components'
import { images } from '../../images.config'

type Props = {
  tvdbId: number
  children: JSX.Element | JSX.Element[]
  style?: any
}

export const EpisodeImage = ({ tvdbId, children, style }: Props) => (
  <>
    <LazyLoadBackgroundImage
      width={250}
      height={140}
      style={{
        borderRadius: 5,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        ...style
      }}
      defaultImage={`https://www.placecage.com/g/${250}/${140}`}
      image={images.episode.small(tvdbId)}
    >
      {children && <BottomTextWrapper>{children}</BottomTextWrapper>}
    </LazyLoadBackgroundImage>
  </>
)

const BottomTextWrapper = styled.div`
  padding: 10px;
  flex-grow: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 30%);
`
