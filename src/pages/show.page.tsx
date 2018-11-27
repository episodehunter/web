import React from 'react';
import { Subscription } from 'rxjs';
import styled from 'styled-components';
import { Button } from '../components/button';
import { EllipsisText } from '../components/ellipsis-text';
import { ShowFanart } from '../components/fanart/show-fanart';
import { SmallShowPoster } from '../components/poster/small-show-poster';
import { Episodes } from '../components/show/episode/episodes';
import { Facts } from '../components/show/facts';
import { FollowingButton } from '../components/show/following-button';
import { NextEpisode } from '../components/show/next-episode';
import { Progress } from '../components/show/progress';
import { Spinner } from '../components/spinner';
import { H1, H3 } from '../components/text';
import { images } from '../images.config';
import { HideOnMobile, isMobile, media } from '../styles/media-queries';
import { seasonSubject$, show$ } from '../utils/firebase/selectors';
import { createUnknownState } from '../utils/firebase/state';
import { Episode, Show, State } from '../utils/firebase/types';

type Props = {
  params: {
    id: string
  }
}

type CompState = {
  show: State<Show>,
  season: State<Episode[]>
  selectedSeason: number
}

export class ShowPage extends React.Component<Props, CompState> {
  subscriptions: Subscription[] = []
  state = {
    show: createUnknownState(),
    season: createUnknownState(),
    selectedSeason: 1
  } as CompState
  setSeasonOnSubject: (season: number) => void

  componentDidMount() {
    const { season$, setSeason } = seasonSubject$(this.props.params.id)
    this.setSeasonOnSubject = setSeason
    this.subscriptions.push(
      show$(this.props.params.id).subscribe(show => this.setState({ show })),
      season$.subscribe(season => this.setState({ season }))
    )
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get isLoading() {
    return !Boolean(this.state.show && this.state.show.status === 'loaded')
  }

  setSeason(season: number) {
    if (!this.setSeasonOnSubject) {
      return
    }
    this.setState({ selectedSeason: season })
    this.setSeasonOnSubject(season)
  }

  render() {
    if (this.isLoading) {
      return (
        <Loading>
          <Spinner />
        </Loading>
      )
    }
    const show = this.state.show.data
    if (!show) {
      return <p>404</p>
    }
    return (
      <PageWrapper tvdbId={show.ids.tvdb}>
        <HideOnMobile>
          <ShowFanart tvdbId={show.ids.tvdb} />
        </HideOnMobile>
        <Wrapper>
          <PosterAndTitleWrapper>
            <HideOnMobile>
              <SmallShowPoster tvdbId={show.ids.tvdb} />
            </HideOnMobile>
            <ShowTitleAndOverview>
              <H1
                style={{
                  maxWidth: 'calc(100vw - 40px)',
                  wordWrap: 'break-word'
                }}
              >
                {show.name}
              </H1>
              <EllipsisText length={500}>{show.overview}</EllipsisText>
              <FollowingButton showId={show.id} />
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
                onClick={() => this.setSeason(season)}
                active={season === this.state.selectedSeason}
              >
                Season {season}
              </Button>
            ))}
          </SeasonButtonsWrapper>
          <EpisodesWrapper>
            <Episodes episodes={this.state.season} />
          </EpisodesWrapper>
        </Wrapper>
      </PageWrapper>
    )
  }
}

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
  justify-content: space-around;
  ${media.tabletAndUp`
    justify-content: flex-start;
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
