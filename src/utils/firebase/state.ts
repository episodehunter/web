import { LoadedState, LoadingState, SourceType, UnknownState } from './types'

export function createLoadingState(): LoadingState {
  return {
    data: undefined,
    status: 'loading',
    source: 'none'
  }
}

export function createLoadedState<T>(
  data: T,
  source: SourceType
): LoadedState<T> {
  return {
    data,
    status: 'loaded',
    source
  }
}

export function createUnknownState(): UnknownState {
  return {
    data: undefined,
    status: 'unknown',
    source: 'none'
  }
}
