import React, { memo } from 'react'
import { createRouter, routerEvents } from 'the-react-router'
import { routes } from './components/router'
import { useUser } from './contexts/user-context'
import { SpinnerPage } from './pages/spinner.page'
import { Navbar } from './components/navbar/navbar'
import { pageview } from './analytics'

const [Router, Routes] = createRouter(routes)

routerEvents.addListener(state => pageview(state.url))

export const App = memo(() => {
  const { loadingCurrentUser, authenticated } = useUser()

  if (loadingCurrentUser) {
    return <SpinnerPage />
  }
  return (
    <Router>
      {authenticated && (
        <>
          <Navbar />
        </>
      )}
      <Routes />
    </Router>
  )
})
