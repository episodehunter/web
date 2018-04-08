import * as React from 'react'
import styled from 'styled-components'
import { alabaster, gossamer } from '../../utils/colors'
import { media } from '../../styles/media-queries'

type Props = {
  seasons: number[]
  selectedSeason: number
  onSetSeason: (seasons: number) => void
}

export const Seasons = ({ seasons, selectedSeason, onSetSeason }: Props) => (
  <Wrapper>
    {seasons.map(season => (
      <ItemWrapper key={season}>
        <Item
          selected={season === selectedSeason}
          onClick={() => onSetSeason(season)}
        >
          {'Season ' + season}
        </Item>
      </ItemWrapper>
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: grid;
  ${media.giant` grid-template-columns: repeat(10, 1fr); width: 60%;`};
  ${media.desktop` grid-template-columns: repeat(8, 1fr); width: 70%;`};
  ${media.tablet`grid-template-columns: repeat(6, 1fr); width: 80%;`};
  grid-template-columns: repeat(3, 1fr);
  margin: 10px;
  width: 100%;
`
const ItemWrapper = styled.div``

const Item = styled.span`
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  font-weight: 100;

  :after {
    display: block;
    content: '';
    border-bottom: 2px solid ${gossamer};
    width: ${(props: { selected: boolean }) => (!props.selected ? 0 : '100%')};
    transition: width 250ms ease-in-out;
  }
  &:hover:after {
    width: 100%;
  }
`
