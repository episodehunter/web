import React from 'react'
import { H1, Body1 } from '../components/atoms/typography'
import { PageWrapper } from '../components/atoms/page-wrapper'

export const Fallback = () => {
  return (
    <PageWrapper>
      <H1>#404</H1>
      <Body1>
        <a href="https://youtu.be/b_ILDFp5DGA?t=85">
          I&apos;m sorry but I could not found what you were looking for.
        </a>
      </Body1>
      <Body1>
        <a href="/">Do you want to go back to the start page?</a>
      </Body1>
    </PageWrapper>
  )
}
