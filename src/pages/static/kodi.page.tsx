import React from 'react'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, H2 } from '../../components/atoms/typography'
import { useGetUserQuery } from '../../dragonstone'
import { SpinnerPage } from '../spinner.page'

export const KodiPage = () => {
  const { data, loading } = useGetUserQuery()

  if (loading || !data) {
    return <SpinnerPage />
  }

  const username = data.me.username
  const apiKey = data.me.apikey

  return (
    <PageWrapper>
      <H2>KODI</H2>
      <Body1>
        Install EpisodeHunter&apos;s KODI add-on to release the full power of EpisodeHunter.
      </Body1>
      <Body1 style={{ margin: 0 }}>
        Your username: <code>{username}</code>
      </Body1>
      <Body1 style={{ margin: 0 }}>
        Your api key: <code>{apiKey}</code>
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
            4. Then fill in &quot;<code>{username}</code>&quot; as your username and &quot;
            <code>{apiKey}</code>&quot; as your api key
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
