import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import { Link } from 'the-react-router'
import { AnimatedListItem } from '../components/atoms/animated-list-item'
import { Margin } from '../components/atoms/margin'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { Body1, PageTitle } from '../components/atoms/typography'
import { Routes } from '../routes'

export const EmptyState = () => {
  return (
    <PageWrapper>
      <Margin top={70} />
      <AnimatedListItem>
        <Card>
          <CardContent>
            <PageTitle>Woops!</PageTitle>
            <Body1>
              It looks like you are not following any shows. The best way to start is by searching
              for your favorite show and start follow that one.
            </Body1>

            <Body1>
              It is also highly recommended to set up you media center to automatically sync what
              you are watcing. See setup guides here for{' '}
              <Link state={null} to={Routes.kodi}>
                Kodi
              </Link>{' '}
              and{' '}
              <Link state={null} to={Routes.kodi}>
                Plex
              </Link>
              , and more to come.
            </Body1>
          </CardContent>
        </Card>
      </AnimatedListItem>
    </PageWrapper>
  )
}

export const EmptyHistory = () => {
  return (
    <PageWrapper>
      <Margin top={70} />
      <AnimatedListItem>
        <Card>
          <CardContent>
            <PageTitle>Woops!</PageTitle>
            <Body1>
              It looks like you haven&apos;t watched anything! Go and watch an episode of your
              favorite tv show
            </Body1>
          </CardContent>
        </Card>
      </AnimatedListItem>
    </PageWrapper>
  )
}
