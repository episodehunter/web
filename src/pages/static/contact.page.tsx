import React from 'react'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, H2 } from '../../components/atoms/typography'

export default () => (
  <PageWrapper>
    <H2>Contact</H2>
    <Body1>
      There are several ways to contact us at Episodehunter. The easiest way is probably to just
      send an email to info@episodehunter.tv
      <br />
      <br />
      If you are using github; you can create an{' '}
      <a
        href="https://github.com/episodehunter/web/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        issue over there.
      </a>
      <br />
      You can also join{' '}
      <a href="https://discord.gg/ESzTFk" target="_blank" rel="noopener noreferrer">
        Discord
      </a>{' '}
      and start a new conversation. <br />
      Or you can just fill out{' '}
      <a href="https://forms.gle/3C9XXYvdEqUEtYHj7" target="_blank" rel="noopener noreferrer">
        this form
      </a>
      .
    </Body1>
  </PageWrapper>
)
