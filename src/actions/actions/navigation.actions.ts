export function navigate(pathname: string): NavigateAction {
  if (pathname === '/') {
    return navigateUpcoming()
  }
  const showMatch = pathname.match(/show\/(\d+)/)
  if (showMatch) {
    return navigateShow(Number(showMatch[1]))
  }

  return navigateUnknown()
}

type NavigateUnknownAction = {
  type: 'NAVIGATE_UNKNOWN'
}
export const navigateUnknown = (): NavigateUnknownAction => ({
  type: 'NAVIGATE_UNKNOWN'
})

type NavigateUpcomingAction = {
  type: 'NAVIGATE_UPCOMING'
}
export const navigateUpcoming = (): NavigateUpcomingAction => ({
  type: 'NAVIGATE_UPCOMING'
})

type NavigateShowAction = {
  type: 'NAVIGATE_SHOW'
  payload: {
    showId: number
  }
}
export const navigateShow = (showId: number): NavigateShowAction => ({
  type: 'NAVIGATE_SHOW',
  payload: { showId }
})

export type NavigateAction =
  | NavigateShowAction
  | NavigateUpcomingAction
  | NavigateUnknownAction
