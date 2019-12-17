import React from 'react'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, PageTitle } from '../../components/atoms/typography'
import { Spinner } from '../../components/spinner'
import { useGetUserQuery } from '../../dragonstone'

export const PlexPage = () => {
  const { data, loading } = useGetUserQuery()

  const username = !loading && data ? data.me.username : ''
  const apiKey = !loading && data ? data.me.apikey : ''

  return (
    <PageWrapper>
      <PageTitle>PLEX</PageTitle>
      <Body1>
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
      </Body1>
      <Body1>
        {username && apiKey ? (
          <code
            style={{ wordBreak: 'break-all' }}
          >{`https://scrobble.episodehunter.tv/plex?username=${username}&key=${apiKey}`}</code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </Body1>
    </PageWrapper>
  )
}
