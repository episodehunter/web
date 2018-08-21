type FetchPartialShowAction = {
  type: 'FETCH_PARTIAL_SHOW'
  payload: {
    showId: number
  }
}
export const fetchParialShow = (showId: number): FetchPartialShowAction => ({
  type: 'FETCH_PARTIAL_SHOW',
  payload: { showId }
})

type FetchFullShowAction = {
  type: 'FETCH_FULL_SHOW'
  payload: {
    showId: number
  }
}
export const fetchFullShow = (showId: number): FetchFullShowAction => ({
  type: 'FETCH_FULL_SHOW',
  payload: { showId }
})

type FetchShowHistory = {
  type: 'FETCH_SHOW_HISTORY'
  payload: {
    showId: number
  }
}
export const fetchShowHistory = (showId: number): FetchShowHistory => ({
  type: 'FETCH_SHOW_HISTORY',
  payload: { showId }
})

export type FetchActions =
  | FetchPartialShowAction
  | FetchFullShowAction
  | FetchShowHistory
