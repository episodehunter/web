import { useNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { useUser } from '../global-context'
import { Fallback } from '../pages/fallback.page'
import { FollowingPage } from '../pages/following.page'
import { HistoryPage } from '../pages/history.page'
import { LoginPage } from '../pages/login.page'
import { SettingsPage } from '../pages/settings.page'
import { ShowPage } from '../pages/show.page'
import { AboutPage } from '../pages/static/about.page'
import { KodiPage } from '../pages/static/kodi.page'
import { PlexPage } from '../pages/static/plex.page'
import { PrivacyPage } from '../pages/static/privacy.page'
import { TosPage } from '../pages/static/tos.page'
import { UpcomingPage } from '../pages/upcoming.page'
import { Routes } from '../routes'
import { shark } from '../utils/colors'
import { requireLogin } from '../utils/require-login'
import { Footer } from './main/footer'
import { Navbar } from './navbar/navbar'
import { Search } from './search'

type RouteComponent = any
type RouteOptions = {
  allowUnauthed?: boolean
}

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: Routes.upcoming,
      exact: true,
      component: RouteLayout(UpcomingPage)
    },
    {
      path: Routes.following,
      component: RouteLayout(FollowingPage)
    },
    {
      path: Routes.history,
      component: RouteLayout(HistoryPage)
    },
    {
      path: Routes.settings,
      component: RouteLayout(SettingsPage)
    },
    {
      path: Routes.show,
      component: RouteLayout(ShowPage)
    },
    {
      path: Routes.login,
      component: RouteLayout(LoginPage, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.about,
      component: RouteLayout(AboutPage)
    },
    {
      path: Routes.privacy,
      component: RouteLayout(PrivacyPage)
    },
    {
      path: Routes.tos,
      component: RouteLayout(TosPage)
    },
    {
      path: Routes.kodi,
      component: RouteLayout(KodiPage)
    },
    {
      path: Routes.plex,
      component: RouteLayout(PlexPage)
    }
  ]
}

function RouteLayout(Component: RouteComponent, { allowUnauthed }: RouteOptions = {}) {
  if (allowUnauthed) {
    return (props: unknown) => (
      <Wrapper>
        <Component {...props} />
        <Footer />
      </Wrapper>
    )
  }

  const RequireLoginComponent = requireLogin<any>(Component)
  return (props: unknown) => {
    const user = useUser()
    const [navigate] = useNavigation()
    if (!user.getUser()) {
      navigate(Routes.login)
      return null
    }

    return (
      <Wrapper>
        <Search />
        <Navbar />
        <RequireLoginComponent {...props} />
        <Footer />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
