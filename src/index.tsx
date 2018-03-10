import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import './styles/global'
import { store } from './store/store'
import { HomePage } from './pages/home'
import { SecretPage } from './pages/secret'

const App = () => (
  <Provider {...store}>
    <Router>
      <Wrapper>
        <Route exact path="/" component={HomePage} />
        <Route path="/secret" component={SecretPage} />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div`
  height: 100%;
`

ReactDOM.render(<App />, document.getElementById('root'))
