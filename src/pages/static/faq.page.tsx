import React from 'react'
import { Link } from 'the-react-router'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, H2 } from '../../components/atoms/typography'
import { Routes } from '../../routes'

export default () => (
  <PageWrapper>
    <H2>FAQ</H2>
    <Body1 style={{ textTransform: 'uppercase', margin: '8px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> Where are all the movies?
    </Body1>
    <Body1>
      <b>A:</b> Yeah, about that. Episodehunter has always been about tv shows. Movies has just been
      an extra service and has never been taken care of as the tv show part and has been disabled
      for now.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> Where is feature X?
    </Body1>
    <Body1>
      <b>A:</b> The old version of Episodehunter was using old and expensive techniques. It was not
      possible to update the old software and the price was getting to high for me as a single
      developer. I therefore made the decision to rewrite the hole application to make it easier to
      maintain and create new features but I could not make it all at once, I therefore decided to
      remove some features but they will get back.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I’m not able to login. Can you help me?
    </Body1>
    <Body1>
      <b>A:</b> Absolutely! You can reset your password here:{' '}
      <a href="https://episodehunter.tv/login">https://episodehunter.tv/login</a>. If you don&apos;t
      remember your email or have any other problems with the login. Just{' '}
      <Link state={null} to={Routes.contact}>
        contact me
      </Link>{' '}
      and we will work it out.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> How do I make contact with you?
    </Body1>
    <Body1>
      <b>A:</b>{' '}
      <Link state={null} to={Routes.contact}>
        See this page
      </Link>
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> How do I report a problem?
    </Body1>
    <Body1>
      <b>A:</b> If you are using GitHub, you can create an issue{' '}
      <a href="https://github.com/episodehunter/web/issues">there</a>. Otherwise, send me an email
      at: info@episodehunter.com. See more at the{' '}
      <Link state={null} to={Routes.contact}>
        contact page.
      </Link>
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I’m a developer and I would like to help!
    </Body1>
    <Body1>
      <b>A:</b> OMG! Yes! You won’t regret this. This project is super fun to work with. It is build
      on top of AWS lambda and firebase auth/database. You can find all type of problems on this
      project. Everything from CSS styling to integrations to database design to TCP connections. Do
      you want to work with Google Home? Alexa? Databases? Css? UX? There is something for you! Just
      contact me and I will get you started! All source code is open source and do exist on{' '}
      <a href="https://github.com/episodehunter">GitHub</a>.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I’m a designer and I would like to help! What can I do?
    </Body1>
    <Body1>
      <b>A:</b> OMG! Yes! You won’t regret this. As you may have seen; I’m not a designer and there
      is some work to be done when to comes to the UX. Do you want to do a completely new design
      from scratch? Or do you think we need to make small changes? I does not matter. Let’s get
      together and make something awesome. See above how you can contact me.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I have a suggestion, are you open for changes?
    </Body1>
    <Body1>
      <b>A:</b> Absolutely!{' '}
      <Link state={null} to={Routes.contact}>
        Just contact me
      </Link>{' '}
      and we will se what we can do/build!
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I miss a show. Can you add it?
    </Body1>
    <Body1>
      <b>A:</b> Absolutely, just{' '}
      <Link state={null} to={Routes.contact}>
        contact me
      </Link>{' '}
      and I will add it.
    </Body1>
    <Body1 style={{ textTransform: 'uppercase', margin: '40px 0 8px 0', fontSize: 18 }}>
      <b>Q:</b> I’m using Plex/Kodi. How do I set up the plugin?
    </Body1>
    <Body1>
      <b>A:</b> You can find instructions for <a href="/kodi">Kodi</a> here and{' '}
      <a href="/plex">Plex</a> here.
    </Body1>
  </PageWrapper>
)
