import { Provider, observer } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Router } from 'react-router-dom'
import styled from 'styled-components'
import { history, store } from './app-state'
import { Navbar } from './components/navbar'
import { FollowingPage } from './pages/following.page'
import { LoginCompletePage } from './pages/login-complete.page'
import { LoginPage } from './pages/login.page'
import { PopularPage } from './pages/popular.page'
import { SearchPage } from './pages/search.page'
import { ShowPage } from './pages/show.page'
import { UpcomingPage } from './pages/upcoming.page'
import './styles/global'
import { shark } from './utils/colors'
import { today } from './utils/date.utils'
import { composeHOC } from './utils/function.util'
import { requireLogin } from './utils/require-login'

type Props = {
  exact?: boolean
  path: string
  hideNavbar?: boolean
  unauthed?: boolean
  component: any
}

const RouterWrapper = ({
  exact,
  path,
  hideNavbar,
  unauthed,
  component
}: Props) => {
  const RenderComponent = unauthed ? component : requireLogin<any>(component)
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        return (
          <Wrapper>
            {!hideNavbar && <Navbar />}
            {<RenderComponent {...props} />}
          </Wrapper>
        )
      }}
    />
  )
}

const AppComponent = () => (
  <Provider {...store} history={history} today={today}>
    <Router history={history}>
      <Wrapper>
        <RouterWrapper exact path="/" component={UpcomingPage} />
        <RouterWrapper path="/following" component={FollowingPage} />
        <RouterWrapper path="/popular" component={PopularPage} />
        <RouterWrapper path="/search" component={SearchPage} />
        <RouterWrapper path="/show/:id" component={ShowPage} />
        <RouterWrapper
          hideNavbar
          unauthed
          path="/login"
          component={LoginPage}
        />
        <RouterWrapper
          hideNavbar
          unauthed
          path="/login_complete"
          component={LoginCompletePage}
        />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`

export const App = composeHOC(hot(module), observer)(AppComponent)
