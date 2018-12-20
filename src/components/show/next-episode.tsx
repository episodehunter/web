import React from 'react'
import { Subscription } from 'rxjs'
import { Episode, Show } from '../../model'
import { dateReleaseFormat, now } from '../../utils/date.utils'
import { composeSeasonAndEpisodeNumber } from '../../utils/episode.util'
import { nextEpisodeToWatch$ } from '../../utils/firebase/selectors'
import { BottomTextWrapper } from '../episode/bottom-text-wrapper'
import { EpisodeImage } from '../episode/episode-image'
import { Spinner } from '../spinner'
import { H3, P2 } from '../text'

type Props = {
  show: Show
}

type State = {
  loading: boolean
  episode: Episode | null
}

export class NextEpisode extends React.Component<Props, State> {
  subscription: Subscription
  state = {
    loading: true,
    episode: null
  } as State

  componentDidMount() {
    this.subscription = nextEpisodeToWatch$(this.props.show.ids.id).subscribe(
      episode => {
        this.setState({ episode, loading: false })
      }
    )
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    if (this.state.loading) {
      return (
        <>
          <H3>Next episode to watch</H3>
          <div style={{ alignSelf: 'center' }}>
            <Spinner />
          </div>
        </>
      )
    }
    const episode = this.state.episode
    if (!episode) {
      return null
    }
    return (
      <>
        <H3>Next episode to watch</H3>
        <EpisodeImage tvdbId={episode.tvdbId}>
          <BottomTextWrapper>
            <P2 margin={0}>
              {composeSeasonAndEpisodeNumber(episode.season, episode.episode)}{' '}
              {episode.name}
            </P2>
            <P2 margin={0}>
              {dateReleaseFormat(
                episode.aired,
                {
                  future: date => `Airs ${date}`,
                  past: date => `Aird ${date}`
                },
                now()
              )}
            </P2>
          </BottomTextWrapper>
        </EpisodeImage>
      </>
    )
  }
}
