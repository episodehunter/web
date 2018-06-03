import { Provider, observer } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { routerEvents, createRouter } from '@vieriksson/the-react-router'
import { dispatch, store } from './app-state'
import { routes } from './components/router'
import './styles/global'
import { today } from './utils/date.utils'
import { composeHOC } from './utils/function.util'

routerEvents.addListener(state => dispatch.navigate(state.url))

const Router = createRouter(routes)

const AppComponent = () => (
  <Provider {...store} today={today}>
    <Router />
  </Provider>
)

const App = composeHOC(hot(module), observer)(AppComponent)

ReactDOM.render(<App />, document.getElementById('root'))
