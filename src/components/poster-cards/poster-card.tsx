import * as React from 'react'
import styled from 'styled-components'
import { alabaster, melrose } from '../../utils/colors'
import { UnstyledLink } from '../unstyled-link'
import { Navigate } from '../../router/router.types'
import { withNavigation } from '../../router/withNavigation'

type Props = {
  linkUrl: string
  poster: JSX.Element
  topRight?: JSX.Element | string
  bottomRight?: JSX.Element | string
  navigate: Navigate
}

const PosterCardComponent = ({
  navigate,
  linkUrl,
  poster,
  bottomRight,
  topRight
}: Props) => (
  <Wrapper onClick={() => navigate(linkUrl)}>
    {poster}
    <InfoWrapper>
      <TopRight>{topRight}</TopRight>
      <BottomRight>{bottomRight}</BottomRight>
    </InfoWrapper>
  </Wrapper>
)

export const PosterCard = withNavigation(PosterCardComponent)

const TopRight = styled.div``
const BottomRight = styled.div`
  font-size: 14px;
`

const Wrapper = styled(UnstyledLink)`
  justify-self: center;
`

const InfoWrapper = styled.div`
  color: ${alabaster};
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  margin: 5px 0 10px 0;
  padding-right: 10px;
  text-align: right;
  border-right: 2px solid ${melrose};
`
