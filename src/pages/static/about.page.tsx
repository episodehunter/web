import * as React from 'react'
import styled from 'styled-components'
import { P } from '../../components/text'
import { alabaster, mountainMeadow, shark } from '../../utils/colors'

export const AboutPage = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>ABOUT EPISODEHUNTER</Title>
    </TitleWrapper>
    <P>
      Episodehunter keeps automatically a record of what you are watching on your media center and
      can there by keep a comprehensive history of all TV shows and movies you have watched and can
      give you tips on what to see next. Episodehunter currently support XBMC. Other clients may be
      supported in the future.
    </P>
    <Header>Contacting us</Header>
    <P>If you have any questions about Episodehunter. Contact us at:</P>
    <div>
      <Contact href="https://episodehunter.tv/">Episodehunter</Contact>
      <Contact href="mail:info@episodehunter.tv">info@episodehunter.tv</Contact>
    </div>
  </Wrapper>
)
const Contact = styled.a`
  display: block;
  margin: 5px 0;
  color: ${mountainMeadow};
`

const Header = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 18px;
`

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
