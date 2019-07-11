import React from 'react'
import styled from 'styled-components'
import { alabaster, shark } from '../utils/colors'

export const ErrorState = () => {
  return (
    <Wrapper>
      <BoxWrapper>
        <Header>Woops!</Header>
        <Text>
          Something went wrong. The error is reported and we will fix it as soon as possible. In the
          meantime; watch an episode of your favorite tv show
        </Text>
      </BoxWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 20px;
  background-color: ${shark};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  padding-top: 70px;
`

const BoxWrapper = styled.div`
  text-align: center;
  max-width: 400px;
  color: ${alabaster};
`

const Header = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  margin-bottom: 10px;
`
const Text = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
`
