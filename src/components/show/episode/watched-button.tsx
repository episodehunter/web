import React from 'react';
import { Episode } from '../../../utils/firebase/types';
import { TextButton } from '../../button';
import { Spinner } from '../../spinner';

type Props = {
  episode: Episode
}

export class WatchedButton extends React.Component<Props> {

  markAsWatched = () => {
    console.log('markAsWatched')
  }

  markAsUnWatched = () => {
    console.log('markAsUnWatched')
  }

  render() {
    if (false) {
      return <Spinner size={14} style={{ alignSelf: 'flex-end' }} />
    } else if (false) {
      return (
        <TextButton onClick={this.markAsUnWatched}>
          Mark as unwatched
        </TextButton>
      )
    } else if (true) {
      return (
        <TextButton onClick={this.markAsWatched}>Mark as watched 📺</TextButton>
      )
    } else {
      return null
    }
  }
}
