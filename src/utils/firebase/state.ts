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

export type StatusType = 'loading' | 'updating' | 'loaded' | 'unknown'
export type SourceType = 'cache' | 'network' | 'none' | 'mixed'

export type State<T> = LoadingState | LoadedState<T> | UnknownState

export interface BaseState<T> {
  data: T | null
  status: StatusType
  source: SourceType
}

export interface UnknownState extends BaseState<undefined> {
  status: 'unknown'
  source: 'none'
}

export interface LoadingState extends BaseState<undefined> {
  status: 'loading'
  source: 'none'
}

export interface LoadedState<T> extends BaseState<T> {
  status: 'loaded'
}
