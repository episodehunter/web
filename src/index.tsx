import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import { Navbar } from './components/navbar';
import { LoginCompletePage } from './pages/login-complete.page';
import { LoginPage } from './pages/login.page';
import { UpcomingPage } from './pages/upcoming.page';
import { createRouter } from './router/router';
import { store } from './store/store';
import { shark } from './utils/colors';
import { requireLogin } from './utils/require-login';

type Props = {
  hideNavbar?: boolean
  unauthed?: boolean
  component: any
}

const RouterWrapper = ({ hideNavbar, unauthed, component }: Props) => {
  const RenderComponent = unauthed ? component : requireLogin<any>(component)
  return () => (
    <Wrapper>
      {!hideNavbar && <Navbar />}
      {<RenderComponent />}
    </Wrapper>
  )
}

const Fallback = () => <div>404</div>

const Router = createRouter({
  fallback: Fallback,
  routes: [
    {
      path: '/',
      exact: true,
      component: RouterWrapper({
        component: UpcomingPage
      })
    },
    {
      path: '/login',
      component: RouterWrapper({
        hideNavbar: true,
        unauthed: true,
        component: LoginPage
      })
    },
    {
      path: '/login_complete',
      component: RouterWrapper({
        hideNavbar: true,
        unauthed: true,
        component: LoginCompletePage
      })
    }
  ]
})

const AppComponent = () => (
  <Provider {...store}>
    <Router />
    {/* <Router history={history}>
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
    </Router> */}
  </Provider>
)

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`

const App = hot(module)(AppComponent)

ReactDOM.render(<App />, document.getElementById('root'))
