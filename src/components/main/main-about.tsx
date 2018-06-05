import * as React from 'react'
import styled from 'styled-components'
import { media } from '../../styles/media-queries'
import { alabaster, gossamer } from '../../utils/colors'

export const MainAbout = () => (
  <Wrapper>
    <TextWrapper>
      <Header>Episodehunter</Header>
      <Description>
        Automatically track what you are watching on your media center and build
        a completely history record of every TV show and movie you are watching
        and be notified about what to see next.
      </Description>
      <Description>Register and meet pure awesomeness.</Description>
    </TextWrapper>
  </Wrapper>
)

const Description = styled.p`
  ${media.giant`font-size: 24px;`};
  ${media.desktop`font-size: 22px;`};
  ${media.tablet`font-size: 20px;`};
  font-size: 14px;
`

const Header = styled.h1`
  ${media.giant`font-size: 60px;`};
  ${media.desktop`font-size: 54px;`};
  ${media.tablet`font-size: 48px;`};
  font-size: 20px;
  color: ${gossamer};
  text-transform: uppercase;
  word-wrap: break-word;
`

const Wrapper = styled.div`
  color: ${alabaster};
  align-self: flex-end;
  font-family: 'Lato', sans-serif;
`

const TextWrapper = styled.div`
  ${media.giant`margin: 5%;`};
  ${media.desktop`margin: 8%;`};
  margin: 10%;
  width: 50%;
`
