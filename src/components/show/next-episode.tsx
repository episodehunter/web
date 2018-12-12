import React from 'react';
import { Subscription } from 'rxjs';
import { Episode, Show } from '../../model';
import { dateReleaseFormat, now } from '../../utils/date.utils';
import { composeSeasonAndEpisodeNumber } from '../../utils/episode.util';
import { nextEpisodeToWatch$ } from '../../utils/firebase/selectors';
import { BottomTextWrapper } from '../episode/bottom-text-wrapper';
import { EpisodeImage } from '../episode/episode-image';
import { H3, P2 } from '../text';

type Props = {
  show: Show
}

type CompStore = {
  episode: Episode | null
}

export class NextEpisode extends React.Component<Props, CompStore> {
  subscription: Subscription

  componentDidMount() {
    this.subscription = nextEpisodeToWatch$(this.props.show.ids.id).subscribe(
      episode => {
        this.setState({ episode })
      }
    )
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    if (!this.state || !this.state.episode) {
      return <p>Loading...</p>
    }
    const episode = this.state.episode
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
