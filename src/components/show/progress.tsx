import React from 'react';
import { Subscription } from 'rxjs';
import styled from 'styled-components';
import { now } from '../../utils/date.utils';
import { numberOfEpisodesToWatchPercent, numberOfUnwatchedHoursLeft } from '../../utils/episode.util';
import { episodesToWatchForShow$ } from '../../utils/firebase/selectors';
import { Episode, Show, StatusType } from '../../utils/firebase/types';
import { GapProgress } from '../progress/gap-progress';
import { H3, HighlightSpan, P2 } from '../text';

type Props = {
  show: Show
}

type CompState = {
  episodesToWatch: Episode[]
  status: StatusType
  totalNumberOfEpisode: number
  numberOfWatchedEpisodes: number
}

export class Progress extends React.Component<Props, CompState> {
  subscription: Subscription
  state = {
    episodesToWatch: [],
    status: 'unknown',
    totalNumberOfEpisode: 0,
    numberOfWatchedEpisodes: 0
  } as CompState

  componentDidMount() {
    console.log('Progress componentDidMount')
    this.subscription = episodesToWatchForShow$(this.props.show.id).subscribe(
      episodes => {
        console.log('episodes: ', episodes, episodes.status)
        const status = episodes.status
        if (status === 'loaded') {
          const today = now()
          const episodesToWatch = episodes.data!.filter(e => e.aired < today)
          const totalNumberOfEpisode = this.props.show.numberOfEpisodes | 0
          const numberOfWatchedEpisodes = Math.max((totalNumberOfEpisode - episodes.data!.length) | 0, 0)

          this.setState({
            status,
            episodesToWatch,
            numberOfWatchedEpisodes,
            totalNumberOfEpisode
          })
        }
      }
    )
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const show = this.props.show
    const {
      episodesToWatch,
      numberOfWatchedEpisodes,
      status,
      totalNumberOfEpisode
    } = this.state
    if (status !== 'loaded') {
      return null
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
