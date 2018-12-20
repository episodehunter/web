import React from 'react'
import { Subscription } from 'rxjs'
import styled from 'styled-components'
import { Episode, Show } from '../../model'
import { now } from '../../utils/date.utils'
import {
  numberOfEpisodesToWatchPercent,
  numberOfUnwatchedHoursLeft
} from '../../utils/episode.util'
import { episodesToWatchForShow$ } from '../../utils/firebase/selectors'
import { GapProgress } from '../progress/gap-progress'
import { Spinner } from '../spinner'
import { H3, HighlightSpan, P2 } from '../text'

type Props = {
  show: Show
}

type CompState = {
  episodesToWatch: Episode[]
  isLoading: boolean
  totalNumberOfEpisode: number
  numberOfWatchedEpisodes: number
}

export class Progress extends React.Component<Props, CompState> {
  subscription: Subscription
  state = {
    episodesToWatch: [],
    isLoading: true,
    totalNumberOfEpisode: 0,
    numberOfWatchedEpisodes: 0
  } as CompState

  componentDidMount() {
    this.subscription = episodesToWatchForShow$(
      this.props.show.ids.id
    ).subscribe(episodes => {
      const today = now()
      const episodesToWatch = episodes.filter(e => e.aired < today)
      const totalNumberOfEpisode = this.props.show.totalNumberOfEpisodes | 0
      const numberOfWatchedEpisodes = Math.max(
        (totalNumberOfEpisode - episodes.length) | 0,
        0
      )

      this.setState({
        isLoading: false,
        episodesToWatch,
        numberOfWatchedEpisodes,
        totalNumberOfEpisode
      })
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const show = this.props.show
    const {
      episodesToWatch,
      numberOfWatchedEpisodes,
      isLoading,
      totalNumberOfEpisode
    } = this.state
    if (isLoading) {
      return (
        <ProgressWarpper>
          <H3>Your progress</H3>
          <div>
            <Spinner />
          </div>
        </ProgressWarpper>
      )
    }
    return (
      <ProgressWarpper>
        <H3>Your progress</H3>
        <GapProgress
          percent={numberOfEpisodesToWatchPercent(
            totalNumberOfEpisode,
            numberOfWatchedEpisodes
          )}
          height="100px"
          width="100px"
        />
        <P2 center={true}>
          You've seen <HighlightSpan>{numberOfWatchedEpisodes}</HighlightSpan>{' '}
          out of <HighlightSpan>{totalNumberOfEpisode}</HighlightSpan> episodes.{' '}
          <br />
          <HoursLeftText
            numberOfHoursLeft={numberOfUnwatchedHoursLeft(
              episodesToWatch.length,
              show.runtime
            )}
          />
        </P2>
      </ProgressWarpper>
    )
  }
}

function HoursLeftText({ numberOfHoursLeft }: { numberOfHoursLeft: number }) {
  if (numberOfHoursLeft <= 0) {
    return <>Nice done 👍</>
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
