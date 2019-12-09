import React from 'react'
import styled from 'styled-components'
import {
  numberOfEpisodesToWatchPercent,
  numberOfUnwatchedHoursLeft
} from '../../utils/episode.util'
import { GapProgress } from '../progress/gap-progress'
import { H3, Body1, Subtitle1 } from '../atoms/Typography'

interface Props {
  episodeRuntime: number
  numberOfAiredEpisodes: number
  numberOfEpisodesToWatch: number
}

export const Progress = ({
  numberOfAiredEpisodes,
  numberOfEpisodesToWatch,
  episodeRuntime
}: Props) => {
  const numberOfWatchedEpisodes = numberOfAiredEpisodes - numberOfEpisodesToWatch
  return (
    <ProgressWarpper>
      <H3>Your progress</H3>
      <GapProgress
        percent={numberOfEpisodesToWatchPercent(numberOfAiredEpisodes, numberOfWatchedEpisodes)}
        height="100px"
        width="100px"
      />
      <Body1 style={{ textAlign: 'center' }}>
        You&apos;ve seen <Subtitle1>{numberOfWatchedEpisodes}</Subtitle1> out of{' '}
        <Subtitle1>{numberOfAiredEpisodes}</Subtitle1> episodes. <br />
        <HoursLeftText
          numberOfHoursLeft={numberOfUnwatchedHoursLeft(numberOfEpisodesToWatch, episodeRuntime)}
        />
      </Body1>
    </ProgressWarpper>
  )
}

function HoursLeftText({ numberOfHoursLeft }: { numberOfHoursLeft: number }) {
  if (numberOfHoursLeft <= 0) {
    return <>Nice done 👍</>
  }
  return (
    <>
      That means you have about <Subtitle1>{numberOfHoursLeft}</Subtitle1> hours left
    </>
  )
}

const ProgressWarpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
