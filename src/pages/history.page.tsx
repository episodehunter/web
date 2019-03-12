// import * as React from 'react'
// import styled from 'styled-components'
// import { apiClient } from '../api/api'
// import { EpisodeImage } from '../components/episode/episode-image'
// import { H3, P2 } from '../components/text'
// // import { ModelStatus } from '../enum'
// import { media } from '../styles/media-queries'
// import { shark } from '../utils/colors'
// import { useApiOnMount } from '../utils/use-api-on-mount'
// // import { time } from '../utils/date.utils'
// import { SpinnerPage } from './spinner.page'

// type Props = {
//   // history: HistoryStore
// }

// function HistoryPage() {
//   const historys = useApiOnMount(() => apiClient.getHistory(), undefined)

//   if (!historys) {
//     return <SpinnerPage />
//   }
//   const episodesSections = historys.map(history => (
//     <React.Fragment key={date}>
//       <H3>{date}</H3>
//       <EpisodeGrid>
//         {episodes.map((episode, index) => (
//           <EpisodeImage tvdbId={episode.tvdbId} key={index}>
//             <P2 margin={0}>
//               {episode.seasonAndEpisodeNumber} {episode.name}
//             </P2>
//             <P2 margin={0}>{time(episode.time)}</P2>
//           </EpisodeImage>
//         ))}
//       </EpisodeGrid>
//     </React.Fragment>
//   ))
// }

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
// export const HistoryPage = inject('history')(observer(HistoryPageComponent))

// const EpisodeGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-column-gap: 20px;
// `

// const Wrapper = styled.div`
//   padding-top: 70px;
//   background-color: ${shark};
//   display: flex;
//   justify-content: center;
// `

// const InnerWarpper = styled.div`
//   ${media.giant`width: 80%;`};
//   ${media.desktop`width: 80%;`};
//   ${media.tablet`width: 90%;`};
//   width: 95%;
// `

// const Loading = styled.div`
//   text-align: center;
//   margin-top: 100px;
// `

export const HistoryPage = () => null
