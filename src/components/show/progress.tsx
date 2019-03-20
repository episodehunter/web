import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useEpisodeStore, useWatchedHistoryStore } from '../../global-context'
import {
  numberOfEpisodesToWatchPercent,
  numberOfUnwatchedHoursLeft
} from '../../utils/episode.util'
import { GapProgress } from '../progress/gap-progress'
import { H3, HighlightSpan, P2 } from '../text'

export const Progress = observer(
  ({ showId, episodeRuntime }: { showId: string; episodeRuntime: number }) => {
    const episodes = useEpisodeStore()
    const watchedHistoryStore = useWatchedHistoryStore()
    const numberOfWatchableEpisodes = episodes.getPossibleEpisodesToWatch(showId).length
    const numberOfWatchedEpisodes = watchedHistoryStore.getNumberOfWatchedEpisodes(showId)
    const numberOfEpisodesToWatch = numberOfWatchableEpisodes - numberOfWatchedEpisodes
    return (
      <ProgressWarpper>
        <H3>Your progress</H3>
        <GapProgress
          percent={numberOfEpisodesToWatchPercent(
            numberOfWatchableEpisodes,
            numberOfWatchedEpisodes
          )}
          height="100px"
          width="100px"
        />
        <P2 center={true}>
          You've seen <HighlightSpan>{numberOfWatchedEpisodes}</HighlightSpan> out of{' '}
          <HighlightSpan>{numberOfWatchableEpisodes}</HighlightSpan> episodes. <br />
          <HoursLeftText
            numberOfHoursLeft={numberOfUnwatchedHoursLeft(numberOfEpisodesToWatch, episodeRuntime)}
          />
        </P2>
      </ProgressWarpper>
    )
  }
)

// type Props = {
//   show: PublicTypes.Show
// }

// type State = {
//   episodesToWatch: Episode[]
//   isLoading: boolean
//   numberOfWatchableEpisodes: number
//   numberOfWatchedEpisodes: number
// }

// export class Progress extends React.Component<Props, State> {
//   subscription: Subscription
//   state = {
//     episodesToWatch: [],
//     isLoading: true,
//     numberOfWatchableEpisodes: 0,
//     numberOfWatchedEpisodes: 0
//   } as State

//   componentDidMount() {
//     this.subscription = episodesToWatchForShow$(this.props.show.ids.id).subscribe(episodes => {
//       const today = now()
//       const episodesToWatch = episodes.filter(e => e.aired < today)
//       const totalNumberOfEpisode = this.props.show.totalNumberOfEpisodes | 0
//       const watchableEpisodes = totalNumberOfEpisode - (episodes.length - episodesToWatch.length)
//       const numberOfWatchedEpisodes = Math.max((watchableEpisodes - episodesToWatch.length) | 0, 0)

//       this.setState({
//         isLoading: false,
//         episodesToWatch,
//         numberOfWatchedEpisodes,
//         numberOfWatchableEpisodes: watchableEpisodes
//       })
//     })
//   }

//   componentWillUnmount() {
//     this.subscription.unsubscribe()
//   }

//   render() {
//     const show = this.props.show
//     const {
//       episodesToWatch,
//       numberOfWatchedEpisodes,
//       isLoading,
//       numberOfWatchableEpisodes
//     } = this.state
//     if (isLoading) {
//       return (
//         <ProgressWarpper>
//           <H3>Your progress</H3>
//           <div>
//             <Spinner />
//           </div>
//         </ProgressWarpper>
//       )
//     }
//     return (
//       <ProgressWarpper>
//         <H3>Your progress</H3>
//         <GapProgress
//           percent={numberOfEpisodesToWatchPercent(
//             numberOfWatchableEpisodes,
//             numberOfWatchedEpisodes
//           )}
//           height="100px"
//           width="100px"
//         />
//         <P2 center={true}>
//           You've seen <HighlightSpan>{numberOfWatchedEpisodes}</HighlightSpan> out of{' '}
//           <HighlightSpan>{numberOfWatchableEpisodes}</HighlightSpan> episodes. <br />
//           <HoursLeftText
//             numberOfHoursLeft={numberOfUnwatchedHoursLeft(episodesToWatch.length, show.runtime)}
//           />
//         </P2>
//       </ProgressWarpper>
//     )
//   }
// }

function HoursLeftText({ numberOfHoursLeft }: { numberOfHoursLeft: number }) {
  if (numberOfHoursLeft <= 0) {
    return <>Nice done 👍</>
  }
  return (
    <>
      That means you have about <HighlightSpan>{numberOfHoursLeft}</HighlightSpan> hours left
    </>
  )
}

const ProgressWarpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
