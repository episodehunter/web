import './styles/global'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { history } from './history'
import { store } from './store/store'
import { HomePage } from './pages/home'
import { LoginPage } from './pages/login'
import { LoginCompletePage } from './pages/login-complete'
import { shark } from './utils/colors'

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
