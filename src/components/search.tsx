import React from 'react'
import { inject, observer } from 'mobx-react'
import { SearchStore } from '../store/search.store'
import { composeHOC } from '../utils/function.util'
import styled from 'styled-components'
import { shark, alabaster } from '../utils/colors'

type Props = {
  search: SearchStore
}

export const Search = composeHOC<Props>(inject('search'), observer)(
  ({ search }: Props) =>
    search.show ? (
      <OverlayWrapper onClick={() => search.toggleShow()}>
        <Wrapper>
          <SearchBox
            autoFocus
            value={search.searchText}
            onChange={({ target: { value } }) => search.setSearchText(value)}
          />
        </Wrapper>
      </OverlayWrapper>
    ) : (
      <div />
    )
)

const SearchBox = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom-style: solid;
  border-bottom-color: #5f5e5e;
  border-bottom-width: 1px;
  color: ${alabaster};
  width: 60%;
  outline: 0;
  font-size: 40px;
  font-weight: lighter;
  text-align: center;
`

const Wrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const OverlayWrapper = styled.div`
  z-index: 10;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: ${shark};
  opacity: 0.95;
  position: fixed;
`
