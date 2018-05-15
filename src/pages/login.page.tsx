import * as React from 'react'
import styled from 'styled-components'
import { shark } from '../utils/colors'
import { media } from '../styles/media-queries'
import { MainAbout } from '../components/main/main-about'
import { MainShows } from '../components/main/main-shows'
import { MainDescription } from '../components/main/main-description'
import { MainHeader } from '../components/main/main-header'
import { MainFooter } from '../components/main/main-footer'
import { images } from '../images.config'
import { UserStore } from '../store/user'
import { inject, observer } from 'mobx-react'
import { withNavigation } from '../router/withNavigation'
import { Navigate } from '../router/router.types'

type Props = {
  user: UserStore
  navigate: Navigate
}

export const LoginPageComponent = ({ user, navigate }: Props) => {
  // if (user.isAuthenticated) {
  //   navigate('/')
  //   return null
  // }
  return (
    <Wrapper>
      <TopImage>
        <MainHeader />
        <MainAbout />
      </TopImage>
      <MainContent>
        <ShowsWrapper>
          <MainShows />
        </ShowsWrapper>
        <DescriptionWrapper>
          <MainDescription />
        </DescriptionWrapper>
      </MainContent>
      <BottomImage>
        <MainFooter />
      </BottomImage>
    </Wrapper>
  )
}

export const LoginPage = withNavigation(
  inject('user')(observer(LoginPageComponent))
)

const MainContent = styled.div`
  background-color: ${shark};
  display: flex;
`
const ShowsWrapper = styled.div`
  ${media.giant`flex: 0.6; grid-gap: 30px;`};
  ${media.desktop`flex: 0.6; grid-gap: 30px;`};
  ${media.tablet`flex: 0.6; grid-gap: 20px;`};
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px;
`

const DescriptionWrapper = styled.div`
  ${media.giant`flex: 0.4; margin: 60px 20px;`};
  ${media.desktop`flex: 0.4; margin: 60px 20px;`};
  ${media.tablet`flex: 0.4; margin: 60px 20px;`};
  flex: 1;
  margin: 0 20px;
`

const CoverImage = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const TopImage = styled(CoverImage)`
  background-image: url(${images.fanart.big(270915)});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const BottomImage = styled(CoverImage)`
  background-image: url(${images.fanart.big(121361)});
`

const Wrapper = styled.div`
  height: 100%;
`
