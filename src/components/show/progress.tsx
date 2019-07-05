import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import {
  numberOfEpisodesToWatchPercent,
  numberOfUnwatchedHoursLeft
} from '../../utils/episode.util'
import { GapProgress } from '../progress/gap-progress'
import { H3, HighlightSpan, P2 } from '../text'

interface Props {
  episodeRuntime: number
  numberOfAiredEpisodes: number
  numberOfEpisodesToWatch: number
}

export const Progress = observer(
  ({ numberOfAiredEpisodes, numberOfEpisodesToWatch, episodeRuntime }: Props) => {
    const numberOfWatchedEpisodes = numberOfAiredEpisodes - numberOfEpisodesToWatch
    return (
      <ProgressWarpper>
        <H3>Your progress</H3>
        <GapProgress
          percent={numberOfEpisodesToWatchPercent(numberOfAiredEpisodes, numberOfWatchedEpisodes)}
          height="100px"
          width="100px"
        />
        <P2 center={true}>
          You've seen <HighlightSpan>{numberOfWatchedEpisodes}</HighlightSpan> out of{' '}
          <HighlightSpan>{numberOfAiredEpisodes}</HighlightSpan> episodes. <br />
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
