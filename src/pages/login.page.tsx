import { Navigate, withNavigation } from '@vieriksson/the-react-router';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { MainAbout } from '../components/main/main-about';
import { MainDescription } from '../components/main/main-description';
import { MainFooter } from '../components/main/main-footer';
import { MainHeader } from '../components/main/main-header';
import { MainShows } from '../components/main/main-shows';
import { images } from '../images.config';
import { Routes } from '../routes';
import { UserStore } from '../store/user';
import { media } from '../styles/media-queries';
import { shark } from '../utils/colors';

type Props = {
  user: UserStore
  navigate: Navigate
}

export class LoginPageComponent extends React.Component<Props> {
  componentDidMount() {
    const { user, navigate } = this.props
    if (user.isAuthenticated) {
      navigate(Routes.upcoming)
    }
  }

  render() {
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
