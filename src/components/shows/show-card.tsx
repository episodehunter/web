import * as React from 'react'
import styled from 'styled-components'
import { ShowCardViews } from './show-card-views'
import { ShowCardTitle } from './show-card-title'

export const ShowCard = () => (
  <Wrapper>
    <ShowCardViews />
    <Image />
    <ShowCardTitle />
  </Wrapper>
)

const Image = styled.img.attrs({
  src: 'http://img.episodehunter.tv/movie/poster/59e0d042bfa23.jpg'
})`
  width: 100%;
`
const Wrapper = styled.div`
  margin: 20px;
  height: 240px;
  width: 160px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
