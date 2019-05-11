import * as React from 'react'
import styled from 'styled-components'
import { P } from '../../components/text'
import { alabaster, shark } from '../../utils/colors'

export const FaqPage = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>FAQ</Title>
    </TitleWrapper>
    <Header>
      <b>Q:</b> Where are all the movies?
    </Header>
    <P>
      <b>A:</b> Yeah, about that. Episodehunter has always been about tv shows. Movies has just been
      an extra service and has never been taken care of as the tv show part and has been disabled
      for now.
    </P>
    <Header>
      <b>Q:</b> Where is feature X?
    </Header>
    <P>
      <b>A:</b> The old version of Episodehunter was using old and expensive techniques. It was not
      possible to update the old software and the price was getting to high for me as a single
      developer. I therefore made the decision to rewrite the hole application to make it easier to
      maintain and create new features but I could not make it all at once, I therefore decided to
      remove some features but they will get back.
    </P>
    <Header>
      <b>Q:</b> Why is the new site much slower than the old one?{' '}
    </Header>
    <P>
      <b>A:</b> One of goals of the rewrite was to make the site cheaper. One solution was to use a
      cheap database (<a href="https://firebase.google.com/">firebase</a>). However, it has turned
      out that it preforms really badly and that it does not scale. I will therefor switch back to a
      more expensive database to make the page fast again.
    </P>
    <Header>
      <b>Q:</b> I’m not able to login. Can you help me?
    </Header>
    <P>
      <b>A:</b> Absolutely! You can reset your password here:{' '}
      <a href="https://episodehunter.tv/login">https://episodehunter.tv/login</a>. If you do not
      remember your email or have any other problems with the login. Just contact me and we will
      work it out.
    </P>
    <Header>
      <b>Q:</b> How do I make contact with you?
    </Header>
    <P>
      <b>A:</b> The easiest way is to join{' '}
      <a href="https://spectrum.chat/episodehunter">https://spectrum.chat/episodehunter</a>. If you
      are using slack I can send you an invitation. You can also send me an email to
      info@episodehunter.com
    </P>
    <Header>
      <b>Q:</b> How do I report a problem?
    </Header>
    <P>
      <b>A:</b> If you are using GitHub, you can create an issue{' '}
      <a href="https://github.com/episodehunter/web/issues">there</a>. Otherwise, send me an email
      at: info@episodehunter.com
    </P>
    <Header>
      <b>Q:</b> I’m a developer and I would like to help!
    </Header>
    <P>
      <b>A:</b> OMG! Yes! You won’t regret this. This project is super fun to work with. It is build
      on top of AWS lambda and firebase auth/database. You can find all type of problems on this
      project. Everything from CSS styling to integrations to database design to TCP connections. Do
      you want to work with Google Home? Alexa? Databases? Css? UX? There is something for you! Just
      contact me and I will get you started! All source code is open source and do exist on{' '}
      <a href="https://github.com/episodehunter">GitHub</a>.
    </P>
    <Header>
      <b>Q:</b> I’m a designer and I would like to help! What can I do?
    </Header>
    <P>
      <b>A:</b> OMG! Yes! You won’t regret this. As you may have seen; I’m not a designer and there
      is some work to be done when to comes to the UX. Do you want to do a completely new design
      from scratch? Or do you think we need to make small changes? I does not matter. Let's get
      together and make something awesome. See above how you can contact me.
    </P>
    <Header>
      <b>Q:</b> I have a suggestion, are you open for changes?
    </Header>
    <P>
      <b>A:</b> Absolutely! Just contact me and we will se what we can do/build!
    </P>
    <Header>
      <b>Q:</b> I miss a show. Can you add it?
    </Header>
    <P>
      <b>A:</b> Absolutely, just send me an email or send a message on slack/spectrum (se above) and
      I will add it.
    </P>
    <Header>
      <b>Q:</b> I'm using Plex/Kodi. How do I set up the plugin?
    </Header>
    <P>
      <b>A:</b> You can find instructions for <a href="/kodi">Kodi</a> here and{' '}
      <a href="/plex">Plex</a> here.
    </P>
  </Wrapper>
)

const Header = styled.h1`
  font-family: 'Lato', sans-serif;
  color: ${alabaster};
  text-transform: uppercase;
  font-weight: normal;
  font-size: 18px;
  margin-bottom: -4px;
`

const Wrapper = styled.div`
  margin: 5% 20%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  flex-direction: column;
`
const TitleWrapper = styled.div``
const Title = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`
