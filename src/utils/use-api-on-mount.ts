import { useEffect, useState } from 'react'

export function useApiOnMount<T>(apiFn: () => Promise<T>, initialState: T): T {
  const [value, setValue] = useState(initialState)

  useEffect(() => {
    apiFn().then(setValue)
  }, [])

  return value
}
