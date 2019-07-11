import React from 'react'
import styled from 'styled-components'
import { useSearch } from '../global-context'
import { alabaster, mountainMeadow, shark } from '../utils/colors'
import { Button } from './button'

export const EmptyState = () => {
  const searchStore = useSearch()
  return (
    <Wrapper>
      <BoxWrapper>
        <Header>Woops!</Header>
        <Text>
          It looks like you are not following any shows. The best way to start is by searching for
          your favorite show and start follow that one
        </Text>
        <Button color={mountainMeadow} onClick={() => searchStore.openSearchBar()}>
          Search for shows
        </Button>
      </BoxWrapper>
    </Wrapper>
  )
}

export const EmptyHistory = () => {
  return (
    <Wrapper>
      <BoxWrapper>
        <Header>Woops!</Header>
        <Text>
          It looks like you haven't watched anything! Go and watch an episode of your favorite tv
          show
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
