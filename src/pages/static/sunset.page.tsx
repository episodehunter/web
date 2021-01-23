import React from 'react'
import { Margin } from '../../components/atoms/margin'
import { PageWrapper } from '../../components/atoms/page-wrapper'
import { Body1, H2 } from '../../components/atoms/typography'

export default () => (
  <PageWrapper>
    <H2>Sunsetting Episodehunter 🌅</H2>
    <Body1>
      It has been a long and exciting journey, and it would not have been possible without you.
      <br />
      Episodehunter has been my best project, without doubt. I have learned so much, and I will be
      forever grateful for it, but it has now come to an end.
    </Body1>
    <Margin top={8} />
    <Body1>
      You can send emails for free by using Gmail, you can stay in touch with your family for free
      by using Facebook, you can watch videos for free on youtube. But these services aren&apos;t
      free for real. You don&apos;t pay money for them directly, but you pay with your personal
      data. Episodehunter, on the other hand is not selling any of your data. I never had and will
      never do. Due to this decision, I never got any income for Episodehunter. I have paid for
      almost ten years server-bills, certificates, and maybe most important, my spare time.
      Don&apos;t get me wrong. I loved to do it, and I would do it again if I could. But it has now
      come to an end. You deserves better.
    </Body1>
    <Body1 style={{ margin: '8px 0 8px 0', fontSize: 18 }}>Q: Is this the end?</Body1>
    <Body1>A: I&apos;m afraid so.</Body1>
    <Body1 style={{ margin: '8px 0 8px 0', fontSize: 18 }}>
      Q: Can I do anything to keep episodehunter up and running?
    </Body1>{' '}
    <Body1>
      A: If you are a programmer, you could help me with your spare time. Otherwise, you can always
      sponsor me. Please send me an email to{' '}
      <a href="mailto:oskar.karlsson@hey.com">oskar.karlsson@hey.com</a> to show me your interest.{' '}
    </Body1>
    <Body1 style={{ margin: '8px 0 8px 0', fontSize: 18 }}>Q: Can I download my data?</Body1>
    <Body1>
      A: Of course, send me an email to{' '}
      <a href="mailto:oskar.karlsson@hey.com">oskar.karlsson@hey.com</a>, and I will fix it.{' '}
    </Body1>
    <Body1 style={{ margin: '8px 0 8px 0', fontSize: 18 }}>Q: When will the site shutdown?</Body1>
    <Body1> A: I will put it down on the last of February (2021-02-28). </Body1>
    <Body1 style={{ margin: '8px 0 8px 0', fontSize: 18 }}>
      Q: Too bad, I will miss episodehunter.
    </Body1>
    <Body1> A: Me too.</Body1>
  </PageWrapper>
)
