import React from 'react'
import { Link } from 'the-react-router'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, H2 } from '../../components/atoms/typography'
import { useGetUserQuery } from '../../dragonstone'
import { Routes } from '../../routes'
import { SpinnerPage } from '../spinner.page'
import { Footer } from '../../components/main/footer'

export default () => {
  const { data, loading } = useGetUserQuery()

  console.log({ data, loading })

  if (loading) {
    return <SpinnerPage />
  }

  if (!data) {
    return (
      <PageWrapper>
        <H2>PLEX</H2>
        <Body1>
          Installing EpisodeHunter for plex is easy peasy but you are required a Plex Pass
          Subscription.
          <br />
          <Link state={null} to={Routes.login}>
            Login
          </Link>{' '}
          to get your custom{' '}
          <a
            href="https://support.plex.tv/articles/115002267687-webhooks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            webhook
          </a>{' '}
          url.
        </Body1>
        <Footer />
      </PageWrapper>
    )
  }

  const username = data.me.username
  const apiKey = data.me.apikey

  return (
    <PageWrapper>
      <H2>PLEX</H2>
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
        <code
          style={{ wordBreak: 'break-all' }}
        >{`https://scrobble.episodehunter.tv/plex?username=${username}&key=${apiKey}`}</code>
      </Body1>
    </PageWrapper>
  )
}
