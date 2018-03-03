import * as React from 'react'
import styled from 'styled-components'
import { Shows } from '../components/shows/shows'
import { media } from '../styles/media-queries'

export const ShowsPage = () => (
  <Wrapper>
    <ShowsWrapper>
      <Shows />
    </ShowsWrapper>
  </Wrapper>
)

const Wrapper = styled.div``

const ShowsWrapper = styled.div`
  ${media.giant`margin: 0 20%;`};
  ${media.desktop`margin: 0 10%;`};
  margin: 0 5%;
`
