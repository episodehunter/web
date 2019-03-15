import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { BottomTextWrapper } from '../components/episode/bottom-text-wrapper'
import { EpisodeImage } from '../components/episode/episode-image'
import { H1, H3, P2 } from '../components/text'
import { useHistoryPage } from '../global-context'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { time } from '../utils/date.utils'
import { composeSeasonAndEpisodeNumber } from '../utils/episode.util'
import { SpinnerPage } from './spinner.page'

export const HistoryPage = observer(() => {
  const historyPageStore = useHistoryPage()

  if (historyPageStore.loadingState.isLoading()) {
    return <SpinnerPage />
  }

  const episodesSections = historyPageStore.groupedHistory.map(([dateString, history]) => (
    <React.Fragment key={dateString}>
      <H3>{dateString}</H3>
      <EpisodeGrid>
        {history.map((h, index) => (
          <EpisodeImage tvdbId={h.episode.tvdbId} key={index}>
            <BottomTextWrapper>
              <P2 margin={0}>
                {composeSeasonAndEpisodeNumber(h.watchedEpisode.season, h.watchedEpisode.episode)}{' '}
                {h.episode.name}
              </P2>
              <P2 margin={0}>{time(h.watchedEpisode.time)}</P2>
            </BottomTextWrapper>
          </EpisodeImage>
        ))}
      </EpisodeGrid>
    </React.Fragment>
  ))
  return (
    <Wrapper>
      <InnerWarpper>
        <>
          <H1>History</H1>
          {episodesSections}
        </>
      </InnerWarpper>
    </Wrapper>
  )
})

// export class HistoryPageComponent extends React.Component<Props> {
//   componentDidMount() {}

//   render() {
//     if (this.props.history.status === ModelStatus.loading) {
//       return <SpinnerPage />
//     }
//     const episodesSections = Object.entries(
//       this.props.history.episodesByDate()
//     ).map(([date, episodes]) => (
//       <React.Fragment key={date}>
//         <H3>{date}</H3>
//         <EpisodeGrid>
//           {episodes.map((episode, index) => (
//             <EpisodeImage tvdbId={episode.tvdbId} key={index}>
//               <P2 margin={0}>
//                 {episode.seasonAndEpisodeNumber} {episode.name}
//               </P2>
//               <P2 margin={0}>{time(episode.time)}</P2>
//             </EpisodeImage>
//           ))}
//         </EpisodeGrid>
//       </React.Fragment>
//     ))

//     return (
//       <Wrapper>
//         <InnerWarpper>
//           <>
//             <H2Light>History</H2Light>
//             {episodesSections}
//           </>
//         </InnerWarpper>
//       </Wrapper>
//     )
//   }
// }

const EpisodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 20px;
`

const Wrapper = styled.div`
  padding-top: 70px;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`

const InnerWarpper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`

// const Loading = styled.div`
//   text-align: center;
//   margin-top: 100px;
// `
