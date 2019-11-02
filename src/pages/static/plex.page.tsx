import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../../components/spinner'
import { P } from '../../components/text'
import { useGetUserQuery } from '../../dragonstone'
import { alabaster, shark } from '../../utils/colors'

export const PlexPage = () => {
  const { data, loading } = useGetUserQuery()

  const username = !loading && data ? data.me.username : ''
  const apiKey = !loading && data ? data.me.apikey : ''

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Plex</Title>
      </TitleWrapper>
      <P>
        Installing EpisodeHunter for plex is easy peasy but you are required a Plex Pass
        Subscription.
        <br />
        Just copy the following url and enter it as a{' '}
        <a
          href="https://support.plex.tv/articles/115002267687-webhooks/"
          target="_blank"
          rel="noopener noreferrer"
        >
          webhook in plex
        </a>
      </P>
      <P>
        {username && apiKey ? (
          <code>
            https://scrobble.episodehunter.tv/plex?username={username}&key=
            {apiKey}
          </code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </P>
    </Wrapper>
  )
}

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
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
