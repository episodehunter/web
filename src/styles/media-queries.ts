import { css } from 'styled-components'
import { memorize } from '../utils/function.util'

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 710
}

const getWindowWidth = memorize((ww = window.innerWidth) => ww)

const giant = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.giant}px) {
      ${css(strings, ...args)};
    }
  `
}

const desktop = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.desktop}px) and (max-width: ${sizes.giant - 1}px) {
      ${css(strings, ...args)};
    }
  `
}

const tablet = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.tablet}px) and (max-width: ${sizes.desktop - 1}px) {
      ${css(strings, ...args)};
    }
  `
}

const tabletAndUp = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.tablet}px) {
      ${css(strings, ...args)};
    }
  `
}

const mobile = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (max-width: ${sizes.tablet}px) {
      ${css(strings, ...args)};
    }
  `
}

export const isMobile = (windowWidth = getWindowWidth()) => windowWidth <= sizes.phone

export const HideOnMobile = ({ children, windowWidth = getWindowWidth() }) => {
  if (isMobile(windowWidth)) {
    return null
  }
  return children
}

export const media = {
  giant,
  desktop,
  tablet,
  tabletAndUp,
  mobile
}
