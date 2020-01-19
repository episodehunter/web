import { memorize } from '../utils/function.util'

const MOBILE_WIDTH = 959

const getWindowWidth = memorize((ww = window.innerWidth) => ww)

export const isMobile = (windowWidth = getWindowWidth()) => windowWidth <= MOBILE_WIDTH

export const HideOnMobile = ({
  render,
  windowWidth = getWindowWidth()
}: {
  render: () => JSX.Element
  windowWidth?: number
}): JSX.Element | null => {
  if (isMobile(windowWidth)) {
    return null
  }
  return render()
}

export const ShowOnlyOnMobile = ({
  render,
  windowWidth = getWindowWidth()
}: {
  render: () => JSX.Element
  windowWidth?: number
}): JSX.Element | null => {
  if (!isMobile(windowWidth)) {
    return null
  }
  return render()
}
