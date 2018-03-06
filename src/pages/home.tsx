import * as React from 'react'
import styled from 'styled-components'
import { Shows } from '../components/shows/shows'
import { media } from '../styles/media-queries'
import { alabaster } from '../utils/colors'
import { Navbar } from '../components/navbar'

export const HomePage = () => (
  <Wrapper>
    <ParallaxBefore>
      <Navbar />
    </ParallaxBefore>
    <Static>
      <ShowsWrapper>
        <Shows />
      </ShowsWrapper>
    </Static>
    <ParallaxAfter />
  </Wrapper>
)

const Section = styled.div`
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Static = styled(Section)`
  background: ${alabaster};
`
const ParallaxBefore = styled(Section)`
  background-image: url('https://placekitten.com/g/900/700');
  min-height: 900px;
`

const ParallaxAfter = styled(Section)`
  background-image: url('https://placekitten.com/g/800/600');
  min-height: 900px;
`

const Wrapper = styled.div``

const ShowsWrapper = styled.div`
  ${media.giant`margin: 0 10%;`};
  ${media.desktop`margin: 0 5%;`};
  margin: 0 2%;
`
