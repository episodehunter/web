import { extractSeasonNumber } from '@episodehunter/utils'
import { Tab, Tabs, styled } from '@material-ui/core'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { H1, H3 } from '../components/atoms/typography'
import { Margin } from '../components/atoms/margin'
import { EllipsisText } from '../components/ellipsis-text'
import { ErrorState } from '../components/error-state'
import { ShowFanart } from '../components/fanart/show-fanart'
import { SmallShowPoster } from '../components/poster/small-show-poster'
import { Episodes } from '../components/show/episode/episodes'
import { Facts } from '../components/show/facts'
import { FollowingButton } from '../components/show/following-button'
import { NextEpisode } from '../components/show/next-episode'
import { Progress } from '../components/show/progress'
import { useGetShowQuery } from '../dragonstone'
import { HideOnMobile, ShowOnlyOnMobile } from '../styles/media-queries'

export const ShowPage = () => {
  const {
    params,
    state: { routeState },
  } = useNavigation<{ id: string; tvdb?: string }, DOMRect>()
  const showId = Number(params.id)
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [animationComplete, setAnimationComplete] = useState(false)
  const { data, error, loading } = useGetShowQuery({
    skip: !showId,
    variables: { id: showId },
    onCompleted(d) {
      if (d.show && d.show.nextToWatch.episode && d.show.nextToWatch.episode.episodenumber) {
        setSelectedSeason(extractSeasonNumber(d.show.nextToWatch.episode.episodenumber))
      }
    },
  })

  const show = data?.show

  if (error) {
    return <ErrorState />
  } else if (!loading && !show) {
    return <H1 style={{ paddingTop: '50px' }}>The show do not exist 😢</H1>
  }

  const showTvdb = show?.ids.tvdb || (params.tvdb && Number(params.tvdb))
  const seasons = show?.seasons.sort((a, b) => a - b) || []

  return (
    <OuterWrapper>
      <ShowFanart tvdbId={showTvdb} animateFrom={routeState} />
      <Wrapper>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -100, zIndex: 1 }}
              animate={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              <PosterAndTitleWrapper>
                <HideOnMobile
                  render={() => (
                    <div style={{ display: 'grid', rowGap: '20px' }}>
                      <SmallShowPoster tvdbId={show?.ids.tvdb} />
                      <FollowingButton show={show} />
                    </div>
                  )}
                />
                <ShowTitleAndOverview>
                  <ShowTitle>{show?.name}</ShowTitle>
                  <ShowOnlyOnMobile
                    render={() => (
                      <>
                        <FollowingButton show={show} />
                        <Margin bottom={8} />
                      </>
                    )}
                  />
                  <EllipsisText length={500}>{show.overview}</EllipsisText>
                </ShowTitleAndOverview>
              </PosterAndTitleWrapper>
            </motion.div>
            <Content>
              <HideOnMobile
                render={() => (
                  <div>
                    <H3>Facts</H3>
                    <Facts show={show} />
                  </div>
                )}
              ></HideOnMobile>
              <Progress
                episodeRuntime={show.runtime}
                numberOfAiredEpisodes={show.numberOfAiredEpisodes}
                numberOfEpisodesToWatch={show.nextToWatch.numberOfEpisodesToWatch}
              />
              <NextEpisodeWarpper>
                <NextEpisode episode={show.nextToWatch.episode} theTvDbShowId={show.ids.tvdb} />
              </NextEpisodeWarpper>
            </Content>
          </>
        )}
      </Wrapper>
      {animationComplete && (
        <Wrapper>
          <SeasonButtonsWrapper>
            <Tabs
              value={selectedSeason}
              onChange={(_, value) => setSelectedSeason(value)}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {seasons.map(season => (
                <Tab key={season} value={season} label={`Season ${season}`} />
              ))}
            </Tabs>
          </SeasonButtonsWrapper>
          {show && (
            <EpisodesWrapper>
              <Episodes
                showId={show.ids.id}
                theTvDbShowId={show.ids.tvdb}
                season={selectedSeason}
              />
            </EpisodesWrapper>
          )}
        </Wrapper>
      )}
    </OuterWrapper>
  )
}

const OuterWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: 70,
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 70,
  },
}))

const Content = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    width: '1000px',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}))

const ShowTitle = styled(H1)(({ theme }) => ({
  maxWidth: 'calc(100vw - 40px)',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15.5vw',
  },
}))

const SeasonButtonsWrapper = styled('div')(({ theme }) => ({
  color: '#fff',
  margin: '20px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '1000px',
  },
}))

const EpisodesWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '1000px',
  },
}))

const PosterAndTitleWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '1000px',
    marginTop: '-66px',
  },
}))

const ShowTitleAndOverview = styled('div')(({ theme }) => ({
  margin: '20px 20px 0 20px',
  [theme.breakpoints.up('md')]: {
    margin: '66px 0 0 20px',
  },
}))

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const NextEpisodeWarpper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-end',
  },
}))
