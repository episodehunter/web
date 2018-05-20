import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { match } from 'react-router'
import styled from 'styled-components'
import { EllipsisText } from '../components/ellipsis-text'
import { ShowFanart } from '../components/fanart/show-fanart'
import { SmallShowPoster } from '../components/poster/small-show-poster'
import { GapProgress } from '../components/progress/gap-progress'
import { Episodes } from '../components/show/episodes'
import { NextEpisode } from '../components/show/next-episode'
import { Spinner } from '../components/spinner'
import { H1, H3, HighlightSpan, P2 } from '../components/text'
import { Show } from '../store/show'
import { ShowStore } from '../store/show.store'
import { safeJoin } from '../utils/array.util'
import { alabaster, capeCod, melrose } from '../utils/colors'
import { format } from '../utils/date.utils'
import { safeStringConvertion } from '../utils/string.util'

type Props = {
  match: match<{ id: string }>
  showStore?: ShowStore
}

class ShowPageComponent extends React.Component<Props> {
  @observable selectedSeason = 1

  @computed
  get show() {
    return this.props.showStore!.getShow(Number(this.props.match.params.id))
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
              <GapProgress percent={70} height="100px" width="100px" />
              <P2 center={true}>
                You've seen <HighlightSpan>10</HighlightSpan> out of{' '}
                <HighlightSpan>15</HighlightSpan> episodes. <br />That means you
                have about <HighlightSpan>5</HighlightSpan> hours left
              </P2>
            </ProgressWarpper>
            <NextEpisodeWarpper>
              <H3>Next episode to watch</H3>
              <NextEpisode episode={show.previousEpisode} />
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

const buildAirsString = (
  airsDayOfWeek: string,
  airsTime: string,
  network: string
) =>
  Boolean(airsDayOfWeek && airsTime && network)
    ? `${airsDayOfWeek} at ${airsTime} on ${network}`
    : ''

const Facts = ({ show }: { show: Show }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <FactLine
      headline="Airs"
      info={buildAirsString(show.airsDayOfWeek, show.airsTime, show.network)}
    />
    <FactLine
      headline="Premiered"
      info={format(show.firstAired, 'Do MMM -YY')}
    />
    <FactLine headline="Language" info={safeStringConvertion(show.language)} />
    <FactLine headline="Runtime" info={safeStringConvertion(show.runtime)} />
    <FactLine headline="Genres" info={safeJoin(show.genre, ', ')} />
    <FactLine headline="Status" info={show.ended ? 'Ended' : 'Running'} />
    <FactLine headline="Followers" info="-" />
  </ul>
)

const FactLine = ({ headline, info }: { headline: string; info: string }) => (
  <li>
    <P2 margin={0}>
      <HighlightSpan>{headline}:</HighlightSpan> {info}
    </P2>
  </li>
)

export const ShowPage = inject('showStore')(observer(ShowPageComponent))

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
