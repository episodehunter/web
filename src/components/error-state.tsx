import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import { AnimatedListItem } from '../components/atoms/animated-list-item'
import { Margin } from '../components/atoms/margin'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { Body1, H2 } from '../components/atoms/typography'

export const ErrorState = () => {
  return (
    <PageWrapper>
      <Margin top={70} />
      <AnimatedListItem>
        <Card>
          <CardContent>
            <H2>Woops!</H2>
            <Body1>
              Something went wrong. The error is reported and we will fix it as soon as possible. In
              the meantime; watch an episode of your favorite tv show
            </Body1>
          </CardContent>
        </Card>
      </AnimatedListItem>
    </PageWrapper>
  )
}
