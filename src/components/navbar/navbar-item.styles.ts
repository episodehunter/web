import styled from 'styled-components'
import { media } from '../../styles/media-queries'
import { alabaster, gossamer, melrose } from '../../utils/colors'

export const Item = styled.a`
  display: flex;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  border-bottom: ${(props: { selected: boolean }) =>
    !props.selected ? '' : `2px solid ${gossamer}`}};
  &:hover {
    border-bottom: ${(props: { selected: boolean }) =>
      !props.selected ? `2px solid ${melrose}` : `2px solid ${gossamer}`}};
  }

  ${media.giant`width: 150px; margin: 10px 10px;`};
  ${media.desktop`width: 150px; margin: 10px 10px;`};
  ${media.tablet`width: 150px;; margin: 10px 10px;`};
  width: 100%;
  justify-content: center;
  margin: 10px 0;
`

export const NavItem = styled(Item)`
  ${media.giant`font-size: 14px; `};
  ${media.desktop`font-size: 13px;`};
  ${media.tablet`font-size: 12px;`};
  font-size: 11px;
`

export const NavSubItem = styled(Item)`
  ${media.giant`font-size: 10px;`};
  ${media.desktop`font-size: 10px;`};
  ${media.tablet`font-size: 10px;`};
  font-size: 10px;
`
