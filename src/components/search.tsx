import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSearch } from '../global-context'
import { media } from '../styles/media-queries'
import { alabaster, shark } from '../utils/colors'
import { SmallShowFanart } from './fanart/small-show-fanart'
import { PosterCard } from './poster-cards/poster-card'
import { useDebounce } from '../utils/use-debounce'

export const Search = observer(() => {
  const searchStore = useSearch()
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (keyIsEscape(event.key)) {
        searchStore.closeSearchBar()
      }
    }
    document.addEventListener('keydown', onKeyPress)
    return () => document.removeEventListener('keydown', onKeyPress)
  }, [])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStore.search(debouncedSearchTerm)
    } else {
      searchStore.setSearchResult([])
    }
  }, [debouncedSearchTerm])

  if (!searchStore.isSearchBarOpen) {
    return null
  }

  const preventEvent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <OverlayWrapper onClick={() => searchStore.closeSearchBar()}>
      <Wrapper onClick={preventEvent}>
        <SearchWrapper>
          <SearchBox autoFocus value={searchTerm} onChange={updateSearchTerm} />
        </SearchWrapper>
        <ResultWrapper>
          {searchStore.searchResult.map(title => (
            <ResultItem key={title.id}>
              <PosterCard
                onClick={() => searchStore.closeSearchBar()}
                linkUrl={`/show/${title.id}/${title.tvdbId}`}
                poster={<SmallShowFanart tvdbId={title.tvdbId} />}
                bottomRight={title.name}
              />
            </ResultItem>
          ))}
        </ResultWrapper>
      </Wrapper>
    </OverlayWrapper>
  )
})

const keyIsEscape = (key: string) => key && key.toLowerCase() === 'escape'

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${media.tabletAndUp`
    grid-template-columns: repeat(5, 1fr);
  `};
  margin-top: 20px;
  margin-bottom: 40px;
`

const ResultItem = styled.div`
  ${media.tabletAndUp`
    margin: 20px;
  `};
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
`

const SearchBox = styled.input`
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom-style: solid;
  border-bottom-color: #5f5e5e;
  border-bottom-width: 1px;
  color: ${alabaster};
  outline: 0;
  font-size: 40px;
  font-weight: lighter;
  text-align: center;
`

const SearchWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  text-align: center;
  justify-content: center;
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
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`
