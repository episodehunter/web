import { action, computed, observable, when } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { EllipsisText } from '../components/ellipsis-text'
import { ShowFanart } from '../components/fanart/show-fanart'
import { SmallShowPoster } from '../components/poster/small-show-poster'
import { GapProgress } from '../components/progress/gap-progress'
import { Episodes } from '../components/show/episode/episodes'
import { Facts } from '../components/show/facts'
import { NextEpisode } from '../components/show/next-episode'
import { Spinner } from '../components/spinner'
import { H1, H3, HighlightSpan, P2 } from '../components/text'
import { ShowStore } from '../store/show.store'
import { alabaster, capeCod, melrose } from '../utils/colors'
import { composeHOC } from '../utils/function.util'

type Props = {
  showStore?: ShowStore
  params: any
}

class ShowPageComponent extends React.Component<Props> {
  private selectedSeasonDisposer: () => void
  @observable selectedSeason = 1

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

  @computed
  get numberOfHoursLeft() {
    return Math.round(
      ((this.show.episodes.length - this.show.numberOfWatchedEpisodes) *
        (this.show.runtime || 60)) /
        60
    )
  }

  @computed
  get numberOfepisodesToWatchPercent() {
    if (this.show.episodes.length === 0) {
      return 0
    }
    return Math.round(
      (this.show.numberOfWatchedEpisodes * 100) / this.show.episodes.length
    )
  }

  get hoursLeftText() {
    if (!this.numberOfHoursLeft) {
      return null
    }
    return (
      <>
        That means you have about{' '}
        <HighlightSpan>{this.numberOfHoursLeft}</HighlightSpan> hours left
      </>
    )
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
            </ShowTitleAndOverview>
          </PosterAndTitleWrapper>
          <Content>
            <FactWarpper>
              <H3>Facts</H3>
              <Facts show={show} />
            </FactWarpper>
            <ProgressWarpper>
              <H3>Your progress</H3>
              <GapProgress
                percent={this.numberOfepisodesToWatchPercent}
                height="100px"
                width="100px"
              />
              <P2 center={true}>
                You've seen{' '}
                <HighlightSpan>
                  {this.show.numberOfWatchedEpisodes}
                </HighlightSpan>{' '}
                out of{' '}
                <HighlightSpan>{this.show.episodes.length}</HighlightSpan>{' '}
                episodes. <br />
                {this.hoursLeftText}
              </P2>
            </ProgressWarpper>
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

const backgroundColor = ({ active }: { active?: boolean }) =>
  active ? melrose : capeCod

const Button = styled.button`
  -webkit-appearance: none;
  border: 0;
  display: inline-block;
  background: ${backgroundColor};
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${alabaster};
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  transition: all 0.2s ease-out;
  margin: 0 10px 10px 0;
  &:hover {
    background: ${melrose};
  }
`

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

const ProgressWarpper = styled(FactWarpper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NextEpisodeWarpper = styled(FactWarpper)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
