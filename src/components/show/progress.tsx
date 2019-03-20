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
