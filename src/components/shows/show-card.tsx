import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../../store/show.store'

type Props = {
  show: Show
}

export const ShowCard = ({ show }: Props) => <Wrapper>{show.title}</Wrapper>

const Wrapper = styled.div`
  border: 1px solid grey;
  margin: 20px;
  height: 100px;
`
