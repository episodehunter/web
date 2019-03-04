import * as React from 'react'
import styled from 'styled-components'
import { P } from '../../components/text'
import { alabaster, shark } from '../../utils/colors'

export const KodiPage = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>KODI</Title>
    </TitleWrapper>
    <P>
      Install EpisodeHunter's KODI add-on to release the full power of
      EpisodeHunter.
    </P>
    <P>Option 1 (recommended):</P>
    <ul>
      <Li>1. Go to "Videos -> Add-ons -> Get more..."</Li>
      <Li>2. Search for EpisodeHunter</Li>
      <Li>3. Install</Li>
      <Li>
        4. Then fill in your username and api key Username: Vieriksson Api key:
        w87T3
      </Li>
      <Li>5. Done and done!</Li>
    </ul>
    <P>Option 2:</P>
    <ul>
      <Li>
        1. Download the plugin from github
        (https://github.com/tjoskar/script.episodeHunter/releases)
      </Li>
      <Li>2. Install it</Li>
      <Li>3. Fill in your username and api key</Li>
      <Li>4. Done!</Li>
    </ul>
  </Wrapper>
)

const Li = styled.li`
  font-family: 'Lato', sans-serif;
`

const Wrapper = styled.div`
  flex: 1;
  margin: 5% 20%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  flex-direction: column;
`
const TitleWrapper = styled.div``
const Title = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
