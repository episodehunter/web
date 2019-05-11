import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../../components/spinner'
import { P } from '../../components/text'
import { useUser } from '../../global-context'
import { alabaster, shark } from '../../utils/colors'

export const PlexPage = observer(() => {
  const metadata = useUser().getMetadata()
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
        <a href="https://support.plex.tv/articles/115002267687-webhooks/" target="_blank">
          webhook in plex
        </a>
      </P>
      <P>
        {metadata ? (
          <code>
            https://scrobble.episodehunter.tv/plex?username={metadata.username}&key=
            {metadata.apikey}
          </code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </P>
    </Wrapper>
  )
})

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
