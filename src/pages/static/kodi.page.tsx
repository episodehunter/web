import React from 'react'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, PageTitle } from '../../components/atoms/typography'
import { Spinner } from '../../components/spinner'
import { useGetUserQuery } from '../../dragonstone'

export const KodiPage = () => {
  const { data, loading } = useGetUserQuery()

  const username = !loading && data ? data.me.username : ''
  const apiKey = !loading && data ? data.me.apikey : ''

  return (
    <PageWrapper>
      <PageTitle>KODI</PageTitle>
      <Body1>
        Install EpisodeHunter&apos;s KODI add-on to release the full power of EpisodeHunter.
      </Body1>
      <Body1 style={{ margin: 0 }}>
        Your username:{' '}
        {username ? (
          <code>{username}</code>
        ) : (
          <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
        )}
      </Body1>
      <Body1 style={{ margin: 0 }}>
        Your api key:{' '}
        {apiKey ? <code>{apiKey}</code> : <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />}
      </Body1>
      <Body1>Option 1 (recommended):</Body1>
      <ul>
        <li>
          <Body1>1. Go to &quot;Videos → Add-ons → Get more...&quot;</Body1>
        </li>
        <li>
          <Body1>2. Search for EpisodeHunter</Body1>
        </li>
        <li>
          <Body1>3. Install</Body1>
        </li>
        <li>
          <Body1>
            4. Then fill in &quot;
            {username ? (
              <code>{username}</code>
            ) : (
              <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
            )}
            &quot; as your username and &quot;
            {apiKey ? (
              <code>{apiKey}</code>
            ) : (
              <Spinner size={16} style={{ margin: '0 0 -4px 0' }} />
            )}
            &quot; as your api key
          </Body1>
        </li>
        <li>
          <Body1>5. Done and done!</Body1>
        </li>
      </ul>
      <Body1>Option 2:</Body1>
      <ul>
        <li>
          <Body1>
            1. Download the plugin from github
            (https://github.com/tjoskar/script.episodeHunter/releases)
          </Body1>
        </li>
        <li>
          <Body1>2. Install it</Body1>
        </li>
        <li>
          <Body1>3. Fill in your username and api key</Body1>
        </li>
        <li>
          <Body1>4. Done!</Body1>
        </li>
      </ul>
    </PageWrapper>
  )
}
