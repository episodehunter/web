import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { match } from 'react-router'
import styled from 'styled-components'
import { Episodes } from '../components/show/episodes'
import { Seasons } from '../components/show/seasons'
import { ShowInfo } from '../components/show/show-info'
import { Spinner } from '../components/spinner'
import { ShowStore } from '../store/show.store'

type Props = {
  match: match<{ id: string }>
  showStore?: ShowStore
}

class ShowPageComponent extends React.Component<Props> {
  @observable selectedSeason: number

  @computed
  get show() {
    return this.props.showStore!.getShow(Number(this.props.match.params.id))
  }

  @action
  setSeason = (season: number) => {
    this.selectedSeason = season
  }

  render() {
    if (this.show.loader.isLoading) {
      return (
        <Loading>
          <Spinner />
        </Loading>
      )
    }
    return (
      <Wrapper>
        <ShowInfo show={this.show} />
        <Seasons
          seasons={this.show.seasons}
          selectedSeason={this.selectedSeason}
          onSetSeason={this.setSeason}
        />
        <Episodes episodes={this.show.episodesPerSeason(this.selectedSeason)} />
      </Wrapper>
    )
  }
}

export const ShowPage = inject('showStore')(observer(ShowPageComponent))

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
