import { action, computed, observable, when } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/button'
import { EllipsisText } from '../components/ellipsis-text'
import { ShowFanart } from '../components/fanart/show-fanart'
import { SmallShowPoster } from '../components/poster/small-show-poster'
import { Episodes } from '../components/show/episode/episodes'
import { Facts } from '../components/show/facts'
import { FollowingButton } from '../components/show/following-button'
import { NextEpisode } from '../components/show/next-episode'
import { Progress } from '../components/show/progress'
import { Spinner } from '../components/spinner'
import { H1, H3 } from '../components/text'
import { ShowStore } from '../store/show.store'
import { composeHOC } from '../utils/function.util'

type Props = {
  showStore?: ShowStore
  params: any
}

class ShowPageComponent extends React.Component<Props> {
  private selectedSeasonDisposer: () => void

  @observable
  selectedSeason = 1

  constructor(props, context) {
    super(props, context)
    this.selectedSeasonDisposer = when(
      () => Boolean(this.show.watchHistory.length),
      () => this.calculateSelectedSeason()
    )
  }

  componentWillUnmount() {
    this.selectedSeasonDisposer()
  }

  calculateSelectedSeason() {
    const nextEpisodeToWatch = this.show.nextEpisodeToWatch
    if (nextEpisodeToWatch && nextEpisodeToWatch.season) {
      this.setSeason(nextEpisodeToWatch.season)()
    }
  }

  @computed
  get show() {
    return this.props.showStore!.getShow(Number(this.props.params.id))
  }

  setSeason(season: number) {
    return action(() => (this.selectedSeason = season))
  }

  render() {
    if (this.show.loader.isLoading) {
      return (
        <Loading>
          <Spinner />
        </Loading>
      )
    }
    const show = this.show
    return (
      <>
        <ShowFanart tvdbId={this.show.tvdbId} />
        <Wrapper>
          <PosterAndTitleWrapper>
            <SmallShowPoster tvdbId={this.show.tvdbId} />
            <ShowTitleAndOverview>
              <H1>{this.show.name}</H1>
              <EllipsisText length={500}>{this.show.overview}</EllipsisText>
              <FollowingButton show={show} />
            </ShowTitleAndOverview>
          </PosterAndTitleWrapper>
          <Content>
            <FactWarpper>
              <H3>Facts</H3>
              <Facts show={show} />
            </FactWarpper>
            <Progress show={show} />
            <NextEpisodeWarpper>
              <NextEpisode show={show} />
            </NextEpisodeWarpper>
          </Content>
        </Wrapper>

        <Wrapper>
          <SeasonButtonsWrapper>
            {show.seasons.map(season => (
              <Button
                key={season}
                onClick={this.setSeason(season)}
                active={season === this.selectedSeason}
              >
                Season {season}
              </Button>
            ))}
          </SeasonButtonsWrapper>
          <Content>
            <Episodes episodes={show.episodesPerSeason(this.selectedSeason)} />
          </Content>
        </Wrapper>
      </>
    )
  }
}

export const ShowPage = composeHOC<Props>(inject('showStore'), observer)(
  ShowPageComponent
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Content = styled.div`
  width: 1000px;
  display: flex;
`

const SeasonButtonsWrapper = styled(Content)`
  flex-wrap: wrap;
`

const PosterAndTitleWrapper = styled(Content)`
  margin-top: -66px;
`

const ShowTitleAndOverview = styled.div`
  margin: 66px 0 0 20px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FactWarpper = styled.div`
  flex: 1;
`

const NextEpisodeWarpper = styled(FactWarpper)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
