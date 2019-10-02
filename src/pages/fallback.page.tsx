import React from 'react'
import styled from 'styled-components'
import { H1 } from '../components/text'

export const Fallback = () => {
  return (
    <Wrapper>
      <Headline>#404</Headline>
      <Link href="https://youtu.be/PDZcqBgCS74?t=83">
        I&apos;m sorry but I could not found what you were looking for
      </Link>
      <Link href="/">Do you want to go back to the start page?</Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

const Headline = styled(H1)`
  font-size: 127px;
`

const Link = styled.a`
  color: #fff;
`
