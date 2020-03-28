import { styled } from '@material-ui/core'
import React from 'react'
import { useNavigation } from 'the-react-router'
import { useOnMount } from '../utils/use-on-mount'
import { Button } from '../components/atoms/button'
import { useUser } from '../contexts/user-context'
import { images } from '../images.config'
import { Routes } from '../routes'
import { mainGreen, whiteIsh } from '../utils/colors'
import { Footer } from '../components/main/footer'

export function LandingPage() {
  const { auth } = useUser()
  const { navigate } = useNavigation()
  useOnMount(async () => {
    if (await auth.isSigndInUser()) {
      navigate(Routes.upcoming)
    }
  })

  return (
    <Wrapper>
      <LoginButtonWrapper>
        <Button onClick={() => navigate('/login')}>Sign in</Button>
      </LoginButtonWrapper>
      <TopImage>
        <Fade />
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
        <Footer />
      </TopImage>
    </Wrapper>
  )
}

const Description = styled('p')(({ theme }) => ({
  fontSize: '16px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.only('md')]: {
    fontSize: '20px',
  },
}))

const Header = styled('h1')(({ theme }) => ({
  fontSize: '30px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '60px',
  },
  [theme.breakpoints.only('md')]: {
    fontSize: '48px',
  },
  color: mainGreen,
  textTransform: 'uppercase',
  wordwrap: 'break-word',
}))

const TextWrapper = styled('div')(({ theme }) => ({
  margin: '10%',
  color: whiteIsh,
  [theme.breakpoints.up('xl')]: {
    fontSize: '5%',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '8%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}))

const LoginButtonWrapper = styled('div')({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 2,
})

const TopImage = styled('div')({
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage: `url(${images.fanart.big(270915)})`,
  display: 'grid',
  gridTemplateColumns: 'auto',
  height: '100vh',
})

const Fade = styled('div')({
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  height: '100vh',
  width: '100vw',
})

const Wrapper = styled('div')({
  alignSelf: 'flex-end',
  zIndex: 1,
})
