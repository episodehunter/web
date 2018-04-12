import './styles/global'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { history } from './history'
import { store } from './store/store'
import { shark } from './utils/colors'
import { UpcomingPage } from './pages/upcoming.page'
import { FollowingPage } from './pages/following.page'
import { LoginPage } from './pages/login.page'
import { LoginCompletePage } from './pages/login-complete.page'
import { PopularPage } from './pages/popular.page'
import { SearchPage } from './pages/search.page'
import { ShowPage } from './pages/show.page'
import { Navbar } from './components/navbar'
import { requireLogin } from './utils/require-login'
import { hot } from 'react-hot-loader'

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
  <Provider {...store}>
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

const App = hot(module)(AppComponent)

ReactDOM.render(<App />, document.getElementById('root'))
