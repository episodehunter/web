import React from 'react'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, PageTitle } from '../../components/atoms/typography'

export const AboutPage = () => (
  <PageWrapper>
    <PageTitle>ABOUT EPISODEHUNTER</PageTitle>
    <Body1>
      Episodehunter keeps automatically a record of what you are watching on your media center and
      can there by keep a comprehensive history of all TV shows and movies you have watched and can
      give you tips on what to see next. Episodehunter currently support XBMC. Other clients may be
      supported in the future.
    </Body1>
    <PageTitle>Contact us</PageTitle>
    <Body1>If you have any questions about Episodehunter. Contact us at:</Body1>
    <div>
      <a href="https://episodehunter.tv/">Episodehunter</a>
      <br />
      <a href="mail:info@episodehunter.tv">info@episodehunter.tv</a>
    </div>
  </PageWrapper>
)
