import { Fallback } from './pages/fallback.page'
import { Navbar } from './components/navbar'
import * as React from 'react'
import { requireLogin } from './utils/require-login'
import { LoginCompletePage } from './pages/login-complete.page'
import { LoginPage } from './pages/login.page'
import { ShowPage } from './pages/show.page'
import { SearchPage } from './pages/search.page'
import { PopularPage } from './pages/popular.page'
import { FollowingPage } from './pages/following.page'
import { UpcomingPage } from './pages/upcoming.page'
import styled from 'styled-components'
import { shark } from './utils/colors'

type Props = {
  hideNavbar?: boolean
  unauthed?: boolean
  component: any
}

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: '/',
      exact: true,
      component: RouteWrapper({
        component: UpcomingPage
      })
    },
    {
      path: '/following',
      component: RouteWrapper({
        component: FollowingPage
      })
    },
    {
      path: '/popular',
      component: RouteWrapper({
        component: PopularPage
      })
    },
    {
      path: '/search',
      component: RouteWrapper({
        component: SearchPage
      })
    },
    {
      path: '/show:id',
      component: RouteWrapper({
        component: ShowPage
      })
    },
    {
      path: '/login',
      component: RouteWrapper({
        hideNavbar: true,
        unauthed: true,
        component: LoginPage
      })
    },
    {
      path: '/login_complete',
      component: RouteWrapper({
        hideNavbar: true,
        unauthed: true,
        component: LoginCompletePage
      })
    }
  ]
}

function RouteWrapper({ hideNavbar, unauthed, component }: Props) {
  const RenderComponent = unauthed ? component : requireLogin<any>(component)
  return () => (
    <Wrapper>
      {!hideNavbar && <Navbar />}
      {<RenderComponent />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
