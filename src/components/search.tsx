import React from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter, scan } from 'rxjs/operators';
import styled from 'styled-components';
import SearchWorker from 'worker-loader!../web-worker/search';
import { Title } from '../model/title';
import { media } from '../styles/media-queries';
import { alabaster, shark } from '../utils/colors';
import { SmallShowFanart } from './fanart/small-show-fanart';
import { PosterCard } from './poster-cards/poster-card';

export class SearchComponent extends React.Component {
  state = {
    showSearchBar: false,
    searchString: '',
    result: [] as Title[]
  }
  subscriptions: Subscription[] = []
  searchWorker = new SearchWorker()

  componentDidMount() {
    (window as any).showSearchBar = () => this.openSearchBar();
    const keypress$ = fromEvent<KeyboardEvent>(document, 'keypress')

    this.subscriptions.push(
      keypress$.pipe(filter(keyEvent => keyIsEscape(keyEvent.key))).subscribe(() => this.closeSearchBar())
    )

    this.subscriptions.push(
      keypress$.pipe(
        filter((key: any) =>
          key.target &&
          key.target.nodeName &&
          key.target.nodeName.toLowerCase() !== 'input'
        ),
        scan((acc, curr: any) => acc + curr.key, ''),
        filter(tot => tot.length > 2),
        debounceTime(50)
      )
      .subscribe(text => {
        this.openSearchBar()
        this.setSearchString(text)
      })
    )

    this.searchWorker.addEventListener('message', this.updateSearchResult)
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.searchWorker.removeEventListener('message', this.updateSearchResult)
  }


  closeSearchBar() {
    this.setState({ showSearchBar: false })
  }

  openSearchBar() {
    this.setState({ showSearchBar: true })
  }

  setSearchString(searchString: string) {
    this.setState({ searchString })
    this.search(searchString);
  }

  search = debounce((searchString: string) => {
    this.searchWorker.postMessage(searchString)
  }, 200)

  updateSearchResult = (event: { data: { result: Title[] } }) => this.setState({ result: event.data.result })

  // onPress(event: React.MouseEvent<HTMLElement>) {
  //   event.preventDefault()
  // }

  preventEvent(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const { showSearchBar, searchString, result } = this.state
    let r = result
    console.log('result: ', r);
    return showSearchBar ? (
      <OverlayWrapper onClick={() => this.closeSearchBar()}>
        <Wrapper>
          <SearchWrapper onClick={this.preventEvent}>
            <SearchBox
              autoFocus
              value={searchString}
              onChange={({ target: { value } }) => this.setSearchString(value)}
            />
          </SearchWrapper>
          <ResultWrapper>
            {r.map(title => (
              <ResultItem key={title.id} onClick={this.preventEvent}>
                <PosterCard
                  linkUrl={`/show/${title.id}`}
                  poster={<SmallShowFanart tvdbId={title.tvdbId} />}
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

const keyIsEscape = key => key && key.toLowerCase() === 'escape'

const debounce = (fn: Function, time: number) => {
  let timeout: any

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), time)
  }
}

export const Search = SearchComponent

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
