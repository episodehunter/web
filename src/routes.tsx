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

type RouteComponent = any
type RouteOptions = {
  hideNavbar?: boolean
  unauthed?: boolean
}

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: '/',
      exact: true,
      component: RouteLayout(UpcomingPage)
    },
    {
      path: '/following',
      component: RouteLayout(FollowingPage)
    },
    {
      path: '/popular',
      component: RouteLayout(PopularPage)
    },
    {
      path: '/search',
      component: RouteLayout(SearchPage)
    },
    {
      path: '/show:id',
      component: RouteLayout(ShowPage)
    },
    {
      path: '/login',
      component: RouteLayout(LoginPage, {
        hideNavbar: true,
        unauthed: true
      })
    },
    {
      path: '/login_complete',
      component: RouteLayout(LoginCompletePage, {
        hideNavbar: true,
        unauthed: true
      })
    }
  ]
}

function RouteLayout(
  component: RouteComponent,
  { hideNavbar, unauthed }: RouteOptions = {}
) {
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
