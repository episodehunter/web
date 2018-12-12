import React from 'react';
import { Episode, WatchedEpisode } from '../../../model';
import { melrose } from '../../../utils/colors';
import { unwatchEpisode, watchEpisode } from '../../../utils/firebase/query';
import { TextButton } from '../../button';
import { Spinner } from '../../spinner';

type Props = {
  episode: Episode
  watched: WatchedEpisode | undefined
  showId: string
}

type State = {
  loading: boolean
}

export class WatchedButton extends React.Component<Props, State> {
  state = {
    loading: false
  }

  markAsWatched = () => {
    console.log('markAsWatched')
    watchEpisode(this.props.showId, this.props.episode.season, this.props.episode.episode)
  }

  markAsUnWatched = () => {
    console.log('markAsUnWatched')
    unwatchEpisode(this.props.showId, this.props.episode.season, this.props.episode.episode)
  }

  render() {
    if (this.state.loading) {
      return <Spinner size={14} style={{ alignSelf: 'flex-end' }} />
    } else if (this.props.watched) {
      return (
        <TextButton onClick={this.markAsUnWatched}>
          Mark as unwatched <i className="material-icons" style={iconStyle}>remove_circle_outline</i>
        </TextButton>
      )
    } else {
      return (
        <TextButton onClick={this.markAsWatched}>Mark as watched <i className="material-icons" style={iconStyle}>tv</i></TextButton>
      )
    }
  }
}

const iconStyle = {
  fontSize: 'inherit',
  color: melrose
}
