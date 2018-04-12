import { css } from 'styled-components'

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

const giant = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.giant}px) {
      ${css(strings, ...args)};
    }
  `
}

const desktop = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.desktop}px) and (max-width: ${sizes.giant -
        1}px) {
      ${css(strings, ...args)};
    }
  `
}

const tablet = (strings: TemplateStringsArray, ...args: string[]) => {
  return css`
    @media (min-width: ${sizes.tablet}px) and (max-width: ${sizes.desktop -
        1}px) {
      ${css(strings, ...args)};
    }
  `
}

export const media = {
  giant,
  desktop,
  tablet
}
