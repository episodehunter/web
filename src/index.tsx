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

const App = () => (
  <Provider {...store}>
    <Router history={history}>
      <Wrapper>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div`
  height: 100%;
`

ReactDOM.render(<App />, document.getElementById('root'))
