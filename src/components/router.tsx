import React from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { useUser } from '../contexts/user-context'
import { Fallback } from '../pages/fallback.page'
import { FollowingPage } from '../pages/following'
import { HistoryPage } from '../pages/history'
import { LoginPage } from '../pages/login.page'
import { AuthAction } from '../pages/auth-action.page'
import { SettingsPage } from '../pages/settings.page'
import { ShowPage } from '../pages/show/show.page'
import { AboutPage } from '../pages/static/about.page'
import { FaqPage } from '../pages/static/faq.page'
import { GoogleHome } from '../pages/static/googlehome.page'
import { KodiPage } from '../pages/static/kodi.page'
import { PlexPage } from '../pages/static/plex.page'
import { PrivacyPage } from '../pages/static/privacy.page'
import { TosPage } from '../pages/static/tos.page'
import { UpcomingPage } from '../pages/upcoming'
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
      path: Routes.authAction,
      component: RouteLayout(AuthAction, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.about,
      component: RouteLayout(AboutPage, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.privacy,
      component: RouteLayout(PrivacyPage, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.tos,
      component: RouteLayout(TosPage, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.kodi,
      component: RouteLayout(KodiPage)
    },
    {
      path: Routes.plex,
      component: RouteLayout(PlexPage)
    },
    {
      path: Routes.googlehome,
      component: RouteLayout(GoogleHome, {
        allowUnauthed: true
      })
    },
    {
      path: Routes.faq,
      component: RouteLayout(FaqPage, {
        allowUnauthed: true
      })
    }
  ]
}

function RouteLayout(Component: RouteComponent, { allowUnauthed }: RouteOptions = {}) {
  if (allowUnauthed) {
    return function RouteLayout(props: unknown) {
      const { currentUser } = useUser()

      return (
        <Wrapper>
          {currentUser && (
            <>
              <Search />
              <Navbar />
            </>
          )}
          <Component {...props} />
          <Footer />
        </Wrapper>
      )
    }
  }

  const RequireLoginComponent = requireLogin<any>(Component)
  return function RouteLayout(props: unknown) {
    const { currentUser } = useUser()
    const { navigate } = useNavigation()
    if (!currentUser) {
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
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`
