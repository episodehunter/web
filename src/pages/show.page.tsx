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
import { images } from '../images.config'
import { ShowStore } from '../store/show.store'
import { HideOnMobile, isMobile, media } from '../styles/media-queries'
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
      <PageWrapper tvdbId={this.show.tvdbId}>
        <HideOnMobile>
          <ShowFanart tvdbId={this.show.tvdbId} />
        </HideOnMobile>
        <Wrapper>
          <PosterAndTitleWrapper>
            <HideOnMobile>
              <SmallShowPoster tvdbId={this.show.tvdbId} />
            </HideOnMobile>
            <ShowTitleAndOverview>
              <H1
                style={{
                  maxWidth: 'calc(100vw - 40px)',
                  wordWrap: 'break-word'
                }}
              >
                {this.show.name}
              </H1>
              <EllipsisText length={500}>{this.show.overview}</EllipsisText>
              <FollowingButton show={show} />
            </ShowTitleAndOverview>
          </PosterAndTitleWrapper>
          <Content>
            <HideOnMobile>
              <FactWarpper>
                <H3>Facts</H3>
                <Facts show={show} />
              </FactWarpper>
            </HideOnMobile>
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
          <EpisodesWrapper>
            <Episodes episodes={show.episodesPerSeason(this.selectedSeason)} />
          </EpisodesWrapper>
        </Wrapper>
      </PageWrapper>
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

const PageWrapperTabletAndUp = styled.div<{ tvdbId: number }>``

const PageWrapperMobile = styled.div<{ tvdbId: number }>`
  position: relative;
  z-index: 2;
  &::before {
    content: ' ';
    position: fixed;
    z-index: -1;
    background-image: url(${props => images.poster.small(props.tvdbId)});
    background-size: 100% 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: opacity(0.3) blur(5px);
  }
`

const PageWrapper = isMobile() ? PageWrapperMobile : PageWrapperTabletAndUp

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${media.tabletAndUp`
    width: 1000px;
    grid-template-columns: 1fr 1fr 1fr;
  `};
`

const SeasonButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  ${media.tabletAndUp`
    width: 1000px;
  `};
`

const EpisodesWrapper = styled.div`
  ${media.tabletAndUp`
    width: 1000px;
  `};
`

const PosterAndTitleWrapper = styled.div`
  ${media.tabletAndUp`
    display: flex;
    width: 1000px;
    margin-top: -66px;
  `};
`

const ShowTitleAndOverview = styled.div`
  margin: 66px 20px 0 20px;
  ${media.tabletAndUp`
    margin: 66px 0 0 20px;
  `};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FactWarpper = styled.div``

const NextEpisodeWarpper = styled(FactWarpper)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
