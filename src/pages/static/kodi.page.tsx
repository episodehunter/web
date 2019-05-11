import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../../components/spinner'
import { P } from '../../components/text'
import { useUser } from '../../global-context'
import { alabaster, shark } from '../../utils/colors'

export const KodiPage = observer(() => {
  const metadata = useUser().getMetadata()
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>KODI</Title>
      </TitleWrapper>
      <P>Install EpisodeHunter's KODI add-on to release the full power of EpisodeHunter.</P>
      <P style={{ margin: 0 }}>
        Your username:{' '}
        {metadata ? (
          <code>{metadata.username}</code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </P>
      <P style={{ margin: 0 }}>
        Your api key:{' '}
        {metadata ? (
          <code>{metadata.apikey}</code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </P>
      <P>Option 1 (recommended):</P>
      <ul>
        <Li>1. Go to "Videos -> Add-ons -> Get more..."</Li>
        <Li>2. Search for EpisodeHunter</Li>
        <Li>3. Install</Li>
        <Li>
          4. Then fill in "
          {metadata ? (
            <code>{metadata.username}</code>
          ) : (
            <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
          )}
          " as your username and "
          {metadata ? (
            <code>{metadata.apikey}</code>
          ) : (
            <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
          )}
          " as your api key
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
})

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
