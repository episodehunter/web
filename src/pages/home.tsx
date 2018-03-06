import * as React from 'react'
import styled from 'styled-components'
import { Shows } from '../components/shows/shows'
import { media } from '../styles/media-queries'

export const HomePage = () => (
  <Wrapper>
    <ShowsWrapper>
      <Shows />
    </ShowsWrapper>
  </Wrapper>
)

const Wrapper = styled.div``

const ShowsWrapper = styled.div`
  ${media.giant`margin: 0 10%;`};
  ${media.desktop`margin: 0 5%;`};
  margin: 0 2%;
`
