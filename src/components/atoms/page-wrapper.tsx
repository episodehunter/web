import React from 'react'
import styled from 'styled-components'
import { media } from '../../styles/media-queries'

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <OuterWrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </OuterWrapper>
  )
}

const InnerWrapper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`

const OuterWrapper = styled.div`
  ${media.tabletAndUp`padding-top: 70px;`};
  ${media.mobile`padding-bottom: 70px;`};
  display: flex;
  justify-content: center;
`
