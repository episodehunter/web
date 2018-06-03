import * as Fuse from 'fuse.js'
import { inject, observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { TitlesStore } from '../store/titles.store'
import { alabaster } from '../utils/colors'

type Props = {
  titles: TitlesStore
}

export class SearchPageComponent extends React.Component<Props> {
  fuse

  state = {
    text: ''
  }

  render() {
    const { titles } = this.props.titles
    this.fuse = new Fuse(titles, {
      shouldSort: true,
      keys: ['name'],
      maxPatternLength: 32,
      minMatchCharLength: 2,
      threshold: 0.6,
      distance: 100
    })
    const res = this.fuse.search(this.state.text)
    return (
      <Wrapper>
        <input
          type="text"
          value={this.state.text}
          onChange={event => this.setState({ text: event.target.value })}
        />
        {res.slice(0, 15).map(title => <div key={title.id}>{title.name}</div>)}
      </Wrapper>
    )
  }
}

export const SearchPage = inject('titles')(observer(SearchPageComponent))

const Wrapper = styled.div`
  color: ${alabaster};
  margin-top: 50px;
  text-align: center;
  width: 100%;
`
