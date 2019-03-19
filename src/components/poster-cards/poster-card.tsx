import { Navigate, useNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { alabaster, melrose } from '../../utils/colors'
import { UnstyledLink } from '../unstyled-link'

type Props = {
  linkUrl: string
  poster: JSX.Element
  topRight?: JSX.Element | string
  bottomRight?: JSX.Element | string
}

export const PosterCard = ({ linkUrl, poster, bottomRight, topRight }: Props) => {
  const [navigate] = useNavigation() as [Navigate]
  return (
    <Wrapper onClick={() => navigate(linkUrl)}>
      {poster}
      <InfoWrapper>
        <TopRight>{topRight}</TopRight>
        <BottomRight>{bottomRight}</BottomRight>
      </InfoWrapper>
    </Wrapper>
  )
}

const TopRight = styled.div``
const BottomRight = styled.div`
  font-size: 14px;
`

const Wrapper = styled(UnstyledLink)`
  justify-self: center;
  cursor: pointer;
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
