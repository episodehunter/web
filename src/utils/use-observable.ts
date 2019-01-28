import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(
  observable: Observable<T>,
  initialState: T,
  onNext?: (n: T) => void
): T {
  const [value, setValue] = useState(initialState)

  useEffect(() => {
    const subscription = observable.subscribe(
      value => {
        onNext && onNext(value)
        setValue(value)
      },
      error => console.error(error)
    )

    return () => subscription.unsubscribe()
  }, [])

  return value
}
