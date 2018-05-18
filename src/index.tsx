import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { store } from './app-state'
import { createRouter } from './router/router'
import { routes } from './routes'
import './styles/global'

const Router = createRouter(routes)

const AppComponent = () => (
  <Provider {...store}>
    <Router />
  </Provider>
)

const App = hot(module)(AppComponent)

ReactDOM.render(<App />, document.getElementById('root'))
