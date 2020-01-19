import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { SpinnerPage } from '../pages/spinner.page'

export function lazyloadComponent(Component: LazyExoticComponent<ComponentType<{}>>) {
  return () => (
    <Suspense fallback={<SpinnerPage />}>
      <Component />
    </Suspense>
  )
}
