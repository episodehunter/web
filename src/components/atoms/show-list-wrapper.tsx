import styled from 'styled-components'
import { media } from '../../styles/media-queries'

export const ShowListWrapper = styled.div`
  display: grid;
  ${media.giant`grid-template-columns: repeat(4, 1fr);`};
  ${media.desktop`grid-template-columns: repeat(4, 1fr);`};
  ${media.tablet`grid-template-columns: repeat(2, 1fr);`};
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr;
`
