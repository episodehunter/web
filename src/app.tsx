import React, { memo } from 'react'
import { createRouter, routerEvents } from 'the-react-router'
import { routes } from './components/router'
import { useUser } from './contexts/user-context'
import { SpinnerPage } from './pages/spinner.page'

const [Router, Routes] = createRouter(routes)
routerEvents.addListener(() => {
  ;(window as any).gtag('config', 'UA-39019686-1', {
    page_path: location.pathname
  })
})

export const App = memo(() => {
  const { loadingCurrentUser } = useUser()

  if (loadingCurrentUser) {
    return <SpinnerPage />
  }
  return (
    <Router>
      <Routes />
    </Router>
  )
})
