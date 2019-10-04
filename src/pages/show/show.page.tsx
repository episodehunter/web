import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { Button } from '../../components/button'
import { EllipsisText } from '../../components/ellipsis-text'
import { ErrorState } from '../../components/error-state'
import { ShowFanart } from '../../components/fanart/show-fanart'
import { SmallShowPoster } from '../../components/poster/small-show-poster'
import { Episodes } from '../../components/show/episode/episodes'
import { Facts } from '../../components/show/facts'
import { FollowingButton } from '../../components/show/following-button'
import { NextEpisode } from '../../components/show/next-episode'
import { Progress } from '../../components/show/progress'
import { H1, H3 } from '../../components/text'
import { images } from '../../images.config'
import { HideOnMobile, isMobile, media } from '../../styles/media-queries'
import { SpinnerPage, AbsoluteSpinnerPage } from '../spinner.page'
import { useShow } from './use-show'

export const ShowPage = observer(() => {
  const { params } = useNavigation<{ id: string; tvdb?: string }>()
  const [show, selectedSeason, setSelectedSeason, isLoading, hasError] = useShow(Number(params.id))

  if (isLoading) {
    if (params.tvdb) {
      return (
        <PageWrapper tvdbId={params.tvdb}>
          <HideOnMobile>
            <ShowFanart tvdbId={params.tvdb} />
          </HideOnMobile>
          <AbsoluteSpinnerPage />
        </PageWrapper>
      )
    } else {
      return <SpinnerPage />
    }
  } else if (hasError) {
    return <ErrorState />
  } else if (!show) {
    return <H1 style={{ paddingTop: '50px' }}>The show do not exist 😢</H1>
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
          <Progress
            episodeRuntime={show.runtime}
            numberOfAiredEpisodes={show.numberOfAiredEpisodes}
            numberOfEpisodesToWatch={show.nextToWatch.numberOfEpisodesToWatch}
          />
          <NextEpisodeWarpper>
            <NextEpisode episode={show.nextToWatch.episode} />
          </NextEpisodeWarpper>
        </Content>
      </Wrapper>

      <Wrapper>
        <SeasonButtonsWrapper>
          {show.seasons.map(season => (
            <Button
              key={season}
              onClick={() => setSelectedSeason(season)}
              active={season === selectedSeason}
            >
              Season {season}
            </Button>
          ))}
        </SeasonButtonsWrapper>
        <EpisodesWrapper>
          <Episodes showId={show.ids.id} season={selectedSeason} />
        </EpisodesWrapper>
      </Wrapper>
    </PageWrapper>
  )
})

const PageWrapperTabletAndUp = styled.div<{ tvdbId: number | string }>``

const PageWrapperMobile = styled.div<{ tvdbId: number | string }>`
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