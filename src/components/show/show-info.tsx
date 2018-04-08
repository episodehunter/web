import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../../store/show'
import { images } from '../../images.config'
import { alabaster, melrose } from '../../utils/colors'
import { media } from '../../styles/media-queries'

type Props = {
  show: Show
}

export const ShowInfo = ({ show }: Props) => (
  <Fanart src={images.fanart.big(show.tvdbId)}>
    <InfoWrapper>
      <Header>{show.name}</Header>
      <Description>{show.overview}</Description>
    </InfoWrapper>
  </Fanart>
)

const InfoWrapper = styled.div`
  ${media.giant`width: 20%;`};
  ${media.desktop`width: 20%;`};
  ${media.tablet`width: 30%;`};
  width: 100%;
  margin: 60px 0;
`
const Header = styled.div`
  ${media.giant`font-size: 40px;`};
  ${media.desktop`font-size: 32px;`};
  ${media.tablet`font-size: 24px;`};
  font-size: 18px;
  color: ${melrose};
  font-family: 'Lato', sans-serif;
  margin: 10px;
`

const Description = styled.div`
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  ${media.giant`font-size: 16px;`};
  ${media.desktop`font-size: 14px;`};
  ${media.tablet`font-size: 12px;`};
  font-size: 12px;
  margin: 10px;
`

const Fanart = styled.div`
  font-weight: lighter;
  position: relative;
  width: 100%;
  height: 70vh;
  background-image: ${(props: { src?: string }) => `linear-gradient(
      to right,
      rgba(26, 28, 33, 1) 15%,
      rgba(26, 28, 33, 0.97) 18%, 
      rgba(26, 28, 33, 0.92) 21%,
      rgba(0, 0, 0, 0) 45%
    ),
    url(${props.src})`};
  background-size: cover;
`
