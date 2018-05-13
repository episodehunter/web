type FetchShowAction = {
  type: 'FETCH_SHOW'
  payload: {
    showId: number
  }
}
export const fetchShow = (showId: number): FetchShowAction => ({
  type: 'FETCH_SHOW',
  payload: { showId }
})

export type FetchActions = FetchShowAction
