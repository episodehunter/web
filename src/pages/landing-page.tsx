import { styled as miStyled } from '@material-ui/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { Button } from '../components/atoms/button'
import { useUser } from '../contexts/user-context'
import { images } from '../images.config'
import { Routes } from '../routes'
import { media } from '../styles/media-queries'
import { mainGreen, whiteIsh } from '../utils/colors'
import { Footer } from '../components/main/footer'

export function LandingPage() {
  const { auth } = useUser()
  const { navigate } = useNavigation()
  useEffect(() => {
    if (auth.isSigndInUser()) {
      navigate(Routes.upcoming)
    }
  }, [])

  return (
    <Wrapper>
      <LoginButtonWrapper>
        <Button onClick={() => navigate('/login')}>Sign in</Button>
      </LoginButtonWrapper>
      <TopImage>
        <Wrapper>
          <TextWrapper>
            <Header>Episodehunter</Header>
            <Description>
              Automatically track what you are watching on your media center and build a completely
              history record of every TV show and movie you are watching and be notified about what
              to see next.
            </Description>
            <Button type="outlined" size="big" onClick={() => navigate('/login/register')}>
              Register and meet pure awesomeness
            </Button>
          </TextWrapper>
        </Wrapper>
        <Footer style={{ padding: 0, alignSelf: 'end', zIndex: 1 }} />
      </TopImage>
    </Wrapper>
  )
}

const Description = styled.p`
  ${media.giant`font-size: 24px;`};
  ${media.desktop`font-size: 22px;`};
  ${media.tablet`font-size: 20px;`};
  font-size: 16px;
`

const Header = styled.h1`
  ${media.giant`font-size: 60px;`};
  ${media.desktop`font-size: 54px;`};
  ${media.tablet`font-size: 48px;`};
  font-size: 30px;
  color: ${mainGreen};
  text-transform: uppercase;
  word-wrap: break-word;
`

const TextWrapper = styled.div`
  ${media.giant`margin: 5%;`};
  ${media.desktop`margin: 8%;`};
  margin: 10%;
  ${media.tabletAndUp`width: 50%;`}
  color: ${whiteIsh};
`

const LoginButtonWrapper = miStyled('div')({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 2
})

const CoverImage = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const TopImage = styled(CoverImage)`
  background-image: url(${images.fanart.big(270915)});
  display: grid;
  grid-template-columns: auto;
  height: 100vh;
  &:after {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    content: '';
    height: 100vh;
    width: 100vw;
  }
`

const Wrapper = styled.div`
  align-self: flex-end;
  z-index: 1;
`
