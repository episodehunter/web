import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { match } from 'react-router'
import styled from 'styled-components'
import { EllipsisText } from '../components/ellipsis-text'
import { EpisodeImage } from '../components/episode/episode-image'
import { ShowFanart } from '../components/fanart/show-fanart'
import { SmallShowPoster } from '../components/poster/small-show-poster'
import { GapProgress } from '../components/progress/gap-progress'
import { Spinner } from '../components/spinner'
import { H1, H3, P } from '../components/text'
import { Show } from '../store/show'
import { ShowStore } from '../store/show.store'
import { safeJoin } from '../utils/array.util'
import { melrose } from '../utils/colors'
import { format } from '../utils/date.utils'
import { safeStringConvertion } from '../utils/string.util'

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
            </ProgressWarpper>
            <NextEpisodeWarpper>
              <H3>Next episode to watch</H3>
              <EpisodeImage episode={show.previousEpisode} />
            </NextEpisodeWarpper>
          </Content>
        </Wrapper>

        {/* <Wrapper>
          <ShowInfo show={this.show} />
          <Seasons
            seasons={this.show.seasons}
            selectedSeason={this.selectedSeason}
            onSetSeason={this.setSeason}
          />
          <Episodes
            episodes={this.show.episodesPerSeason(this.selectedSeason)}
          />
        </Wrapper> */}
      </>
    )
  }
}

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
    <P style={{ margin: 0 }}>
      <span style={{ color: melrose }}>{headline}:</span> {info}
    </P>
  </li>
)

export const ShowPage = inject('showStore')(observer(ShowPageComponent))

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Content = styled.div`
  width: 900px;
  display: flex;
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
