import * as React from 'react'
import styled from 'styled-components'
import { P } from '../../components/text'
import { alabaster, mountainMeadow, shark } from '../../utils/colors'

export const PrivacyPage = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>PRIVACY POLICY</Title>
    </TitleWrapper>
    <Header>Personal identification information</Header>
    <P>
      Episodehunter keeps automatically a record of what you are watching on your media center and
      can there by keep a comprehensive history of all TV shows and movies you have watched and can
      give you tips on what to see next. Episodehunter currently support XBMC. Other clients may be
      supported in the future.
    </P>
    <Header>Non-personal identification information</Header>
    <P>
      We may collect non-personal identification information about Users whenever they interact with
      our Site. Non-personal identification information may include the browser name, the type of
      computer and technical information about Users means of connection to our Site, such as the
      operating system and the Internet service providers utilized and other similar information.
    </P>
    <Header>Web browser cookies</Header>
    <P>
      Our Site may use &quot;cookies&quot; to enhance User experience. User&apos;s web browser
      places cookies on their hard drive for record-keeping purposes and sometimes to track
      information about them. User may choose to set their web browser to refuse cookies, or to
      alert you when cookies are being sent. If they do so, note that some parts of the Site may not
      function properly.
    </P>
    <Header>How we use collected information</Header>
    <P>
      Episodehunter may collect and use Users personal information for the following purposes: - To
      personalize user experience We may use information in the aggregate to understand how our
      Users as a group use the services and resources provided on our Site. - To improve our Site We
      may use feedback you provide to improve our products and services. - To send periodic emails
      We may use the email address to respond to their inquiries, questions, and/or other requests.
      If User decides to opt-in to our mailing list, they will receive emails that may include
      company news, updates, related product or service information, etc. If at any time the User
      would like to unsubscribe from receiving future emails, they may do so by contacting us via
      our Site.
    </P>
    <Header>How we protect your information</Header>
    <P>
      We adopt appropriate data collection, storage and processing practices and security measures
      to protect against unauthorized access, alteration, disclosure or destruction of your personal
      information, username, password, transaction information and data stored on our Site.
    </P>
    <Header>Sharing your personal information</Header>
    <P>
      We do not sell, trade, or rent Users personal identification information to others. We may
      share generic aggregated demographic information not linked to any personal identification
      information regarding visitors and users with our business partners, trusted affiliates and
      advertisers for the purposes outlined above.We may use third party service providers to help
      us operate our business and the Site or administer activities on our behalf, such as sending
      out newsletters or surveys. We may share your information with these third parties for those
      limited purposes provided that you have given us your permission.
    </P>
    <Header>Third party websites</Header>
    <P>
      Users may find advertising or other content on our Site that link to the sites and services of
      our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not
      control the content or links that appear on these sites and are not responsible for the
      practices employed by websites linked to or from our Site. In addition, these sites or
      services, including their content and links, may be constantly changing. These sites and
      services may have their own privacy policies and customer service policies. Browsing and
      interaction on any other website, including websites which have a link to our Site, is subject
      to that website&apos;s own terms and policies.
    </P>
    <Header>Changes to this privacy policy</Header>
    <P>
      Episodehunter has the discretion to update this privacy policy at any time. When we do, we
      will post a notification on the main page of our Site, revise the updated date at the bottom
      of this page and send you an email. We encourage Users to frequently check this page for any
      changes to stay informed about how we are helping to protect the personal information we
      collect. You acknowledge and agree that it is your responsibility to review this privacy
      policy periodically and become aware of modifications.{' '}
    </P>
    <Header>Your acceptance of these terms</Header>
    <P>
      By using this Site, you signify your acceptance of this policy. If you do not agree to this
      policy, please do not use our Site. Your continued use of the Site following the posting of
      changes to this policy will be deemed your acceptance of those changes.
    </P>
    <Header>Contacting us</Header>
    <P>
      If you have any questions about this Privacy Policy, the practices of this site, or your
      dealings with this site, please contact us at:
    </P>
    <ContactWrapper>
      <Contact href="https://episodehunter.tv/">Episodehunter</Contact>
      <Contact href="mail:info@episodehunter.tv">info@episodehunter.tv</Contact>
    </ContactWrapper>
    <Ending>This document was last updated on February 28, 2013</Ending>
  </Wrapper>
)

const ContactWrapper = styled.div``
const Contact = styled.a`
  display: block;
  margin: 5px 0;
  color: ${mountainMeadow};
  font-family: 'Lato', sans-serif;
`
const Wrapper = styled.div`
  flex: 1;
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
const Header = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 18px;
`
const Ending = styled.p`
  font-family: 'Lato', sans-serif;
  color: white;
  font-weight: lighter;
  font-size: 12px;
`
