import { useEffect } from 'react'

export function useOnMount(functionToCallOnMount: () => any) {
  useEffect(() => {
    const result = functionToCallOnMount()
    if (typeof result === 'function') {
      return result
    }
  }, [])
}
