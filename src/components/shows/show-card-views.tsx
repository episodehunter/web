import * as React from 'react'
import styled from 'styled-components'
import { capeCod, alabaster } from '../../utils/colors'

export const ShowCardViews = () => (
  <ViewsWrapper>
    <NumOfViews>{Math.floor(Math.random() * 150)}</NumOfViews>
    <Views>VIEWS</Views>
  </ViewsWrapper>
)

const Views = styled.div`
  font-size: 10px;
`

const NumOfViews = styled.div`
  font-size: 14px;
  text-align: left;
`

const ViewsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px 10px;
  z-index: 1;

  background-color: ${capeCod};
  color: ${alabaster};
  opacity: 0.8;
  font-family: 'Lato', sans-serif;
`
