import * as React from 'react'
import styled from 'styled-components'
import { manatee } from '../../utils/colors'
import { RegisterButton, LoginButton } from '../login-buttons'
import { media } from '../../styles/media-queries'

export const MainFooter = () => (
  <Wrapper>
    <ButtonsWrapper>
      <ButtonWrapper>
        <RegisterButton />
      </ButtonWrapper>
      <ButtonWrapper>
        <LoginButton />
      </ButtonWrapper>
    </ButtonsWrapper>
    <FooterWrapper>
      <FooterItem>©EpisodeHunter 2018</FooterItem>
      <FooterItem>Privacy Policy</FooterItem>
      <FooterItem>Terms of Service</FooterItem>
      <FooterItem>XBMC</FooterItem>
    </FooterWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ButtonWrapper = styled.div`
  margin: 20px;
`

const FooterWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`

const FooterItem = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 10px;
  color: ${manatee};
  cursor: pointer;
  ${media.giant`margin: 0 40px;`};
  ${media.desktop`margin: 0 30px;`};
  ${media.tablet`margin: 0 20px;`};
  margin: 0 10px;
`
