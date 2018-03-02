import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import './styles'
import { store } from './store/store'
import { Navbar } from './components/navbar'
import { HomePage } from './pages/home'
import { MoviesPage } from './pages/movies'
import { ShowsPage } from './pages/shows'

const App = () => (
  <Provider {...store}>
    <Router>
      <Wrapper>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/shows" component={ShowsPage} />
      </Wrapper>
    </Router>
  </Provider>
)

const Wrapper = styled.div``

ReactDOM.render(<App />, document.getElementById('root'))
