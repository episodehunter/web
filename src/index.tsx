import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import './styles/global'
import { store } from './store/store'
import { HomePage } from './pages/home'
import { UpcomingPage } from './pages/upcoming'
import { SearchPage } from './pages/search'

const App = () => (
  <Provider {...store}>
    <Router>
      <Wrapper>
        <Route exact path="/" component={HomePage} />
        <Route path="/upcoming" component={UpcomingPage} />
        <Route path="/search" component={SearchPage} />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div``

ReactDOM.render(<App />, document.getElementById('root'))
