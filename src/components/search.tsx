import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import Fuse from 'fuse.js'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { Subscription, fromEvent } from 'rxjs'
import styled from 'styled-components'
import { SearchStore } from '../store/search.store'
import { Title, TitlesStore } from '../store/titles.store'
import { alabaster, shark } from '../utils/colors'
import { composeHOC } from '../utils/function.util'
import { PosterCard } from './poster-cards/poster-card'
import { SmallShowPoster } from './poster/small-show-poster'

type Props = {
  search?: SearchStore
  titles?: TitlesStore
  navigate?: Navigate
}

export class SearchComponent extends React.Component<Props> {
  subscription: Subscription
  fuse: Fuse

  componentDidMount() {
    this.subscription = fromEvent<KeyboardEvent>(document, 'keydown').subscribe(
      keyEvent => {
        if (keyEvent.key.toLowerCase() === 'escape') {
          this.props.search!.toggleShow()
        }
      }
    )
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  onPress(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    // this.props.navigate!(`/show/${id}`)
  }

  render() {
    const { search, titles } = this.props
    this.fuse = new Fuse(titles!.titles, {
      shouldSort: true,
      keys: ['name'],
      maxPatternLength: 32,
      minMatchCharLength: 2,
      threshold: 0.6,
      distance: 100
    })
    const res = this.fuse.search<Title>(search!.searchText)
    return search!.show ? (
      <OverlayWrapper onClick={() => search!.toggleShow()}>
        <Wrapper>
          <SearchWrapper>
            <SearchBox
              autoFocus
              value={search!.searchText}
              onChange={({ target: { value } }) => search!.setSearchText(value)}
            />
          </SearchWrapper>
          <ResultWrapper>
            {res.slice(0, 16).map(title => (
              <ResultItem key={title.id} onClick={event => this.onPress(event)}>
                <PosterCard
                  linkUrl={`/show/${title.id}`}
                  poster={<SmallShowPoster tvdbId={title.tvdbId} />}
                  bottomRight={title.name}
                />
              </ResultItem>
            ))}
          </ResultWrapper>
        </Wrapper>
      </OverlayWrapper>
    ) : (
      <div />
    )
  }
}

export const Search = composeHOC<Props>(
  withNavigation,
  inject('search', 'titles'),
  observer
)(SearchComponent)

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 20px;
`

const ResultItem = styled.div``

const Wrapper = styled.div`
  width 60%;
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
`
