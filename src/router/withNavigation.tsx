import * as React from 'react'
import { RouterConsumer } from './router.context'
import { RouterParams } from './router.types'

export function withNavigation(Component: any) {
  return props => (
    <RouterConsumer>
      {({ state, navigate }: RouterParams) => (
        <Component state={state} navigate={navigate} {...props} />
      )}
    </RouterConsumer>
  )
}
