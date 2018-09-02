import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Show } from '../../store/show'
import {
  numberOfEpisodesToWatchPercent,
  numberOfUnwatchedHoursLeft
} from '../../utils/episode.util'
import { GapProgress } from '../progress/gap-progress'
import { H3, HighlightSpan, P2 } from '../text'

type Props = {
  show: Show
}

function ProgressComponent({ show }: Props) {
  return (
    <ProgressWarpper>
      <H3>Your progress</H3>
      <GapProgress
        percent={numberOfEpisodesToWatchPercent(
          show.episodes.length,
          show.numberOfWatchedEpisodes
        )}
        height="100px"
        width="100px"
      />
      <P2 center={true}>
        You've seen{' '}
        <HighlightSpan>{show.numberOfWatchedEpisodes}</HighlightSpan> out of{' '}
        <HighlightSpan>{show.episodes.length}</HighlightSpan> episodes. <br />
        <HoursLeftText
          numberOfHoursLeft={numberOfUnwatchedHoursLeft(
            show.episodes.length,
            show.numberOfWatchedEpisodes,
            show.runtime
          )}
        />
      </P2>
    </ProgressWarpper>
  )
}

export const Progress = observer(ProgressComponent)

function HoursLeftText({ numberOfHoursLeft }: { numberOfHoursLeft: number }) {
  if (!numberOfHoursLeft) {
    return null
  }
  return (
    <>
      That means you have about{' '}
      <HighlightSpan>{numberOfHoursLeft}</HighlightSpan> hours left
    </>
  )
}

const ProgressWarpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
