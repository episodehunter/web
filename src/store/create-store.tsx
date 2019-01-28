import React, { createContext, ReactNode, useContext, useState } from 'react'

export function createStore<T>(initValue: T) {
  const context = createContext(initValue)
  const { Provider } = context
  let currentState = initValue
  let setState: (value: Partial<T>) => void = (value: Partial<T>) =>
    Object.assign(currentState, value) // So we can call `setState` before `StateProvider` is called

  const useStore = () => {
    const c = useContext(context)
    return [c, setState] as [T, (value: Partial<T>) => void]
  }

  const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, set] = useState(currentState)
    setState = set as any

    return <Provider value={state}>{children}</Provider>
  }

  return { useStore, StateProvider, context, setState }
}
