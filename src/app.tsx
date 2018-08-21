import { createRouter, routerEvents } from '@vieriksson/the-react-router'
import { action, observable, when } from 'mobx'
import { observer, Provider } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { dispatch, store } from './app-state'
import { routes } from './components/router'
import { SpinnerPage } from './pages/spinner.page'
import { today } from './utils/date.utils'
import { composeHOC } from './utils/function.util'

routerEvents.addListener(state => dispatch.navigate(state.url))

const Router = createRouter(routes)

class AppComponent extends React.Component {
  @observable
  showSpinner = true

  constructor(props, context) {
    super(props, context)
    when(
      () => store.user.user !== undefined,
      action(() => (this.showSpinner = false))
    )
  }

  render() {
    if (this.showSpinner) {
      return <SpinnerPage />
    }
    return (
      <Provider {...store} today={today}>
        <Router />
      </Provider>
    )
  }
}

export const App = composeHOC(hot(module), observer)(AppComponent)
