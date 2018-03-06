import * as React from 'react'
import styled from 'styled-components'
import { ShowStore } from '../../store/show.store'
import { ShowCard } from './show-card'
import { inject } from 'mobx-react'
import { media } from '../../styles/media-queries'

type Props = {
  showStore?: ShowStore
}
export const ShowsComponent = ({ showStore }: Props) => (
  <Wrapper>{showStore!.shows.map((_, key) => <ShowCard key={key} />)}</Wrapper>
)

export const Shows = inject('showStore')(ShowsComponent)

const Wrapper = styled.div`
  display: grid;
  text-align: center;
  ${media.giant`grid-template-columns: repeat(5, 1fr);`};
  ${media.desktop`grid-template-columns: repeat(4, 1fr);`};
  grid-template-columns: repeat(2, 1fr);
`
