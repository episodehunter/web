import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { history } from './history'
import './styles/global'
import { store } from './store/store'
import { HomePage } from './pages/home'
import { LoginPage } from './pages/login'
import { Redirect } from 'react-router'
import { shark } from './utils/colors'

const LoginCompletePage = ({ location }: any) => {
  const access_token = (location.hash.match(/#access_token=(.*?)&/) || [])[1]
  const expires_in = '1230837120938129381902381092'
  localStorage.setItem('access_token', access_token)
  localStorage.setItem('expires_at', expires_in)
  return <Redirect to="/" />
}

const App = () => (
  <Provider {...store}>
    <Router history={history}>
      <Wrapper>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/login_complete" component={LoginCompletePage} />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`

ReactDOM.render(<App />, document.getElementById('root'))
