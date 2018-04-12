import * as React from 'react'
import styled from 'styled-components'
import { media } from '../../styles/media-queries'
// import { alabaster } from '../../utils/colors'

export const MainDescription = () => (
  <Wrapper>
    <Text>Follow you favorite shows</Text>
    <Text>Never miss an episode</Text>
    <Text>Automatically scrobble</Text>
    <Text>Get recommendations from other users</Text>
    <Text>Interact through Google Home</Text>
  </Wrapper>
)

const Text = styled.h3`
  ${media.giant`font-size: 24px;`};
  ${media.desktop`font-size: 20px;`};
  ${media.tablet`font-size: 18px;`};
  font-size: 12px;
  color: #95a5a6;
  text-transform: uppercase;
  word-wrap: break-word;
  text-align: center;
`
const Wrapper = styled.div`
  color: #999;
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`
