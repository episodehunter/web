import * as React from 'react'
import styled from 'styled-components'
import { P } from '../../components/text'
import { alabaster, shark } from '../../utils/colors'

export const GoogleHome = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>Google Home (beta)</Title>
    </TitleWrapper>
    <P>
      Episodehunter for Google Home is an easy way to keep trak of what you can watch and tell it
      what you watch/like etc.
      <br />
      You can for example say:
      <br />
      – What can I watch tonight?
      <br />
      – When is the next episode for Stranger Things?
      <br />
      – How many episodes of Game of thrones have I watchd?
      <br />
      – How many episodes does it exists of Dexter?
      <br />
      – How many hours have I spent on Breaking bad?
      <br />
      – Tell me a quote?
      <br />
      <br />
      <br />
      And many many more.
      <br />
      Episodehunter for Google Home is just now under beta and is not publicly accessible. Contact
      us if you want to join and help on the beta.
    </P>
  </Wrapper>
)

const Wrapper = styled.div`
  margin: 5% 20%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  flex-direction: column;
`
const TitleWrapper = styled.div``
const Title = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
