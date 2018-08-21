import { action, observable } from 'mobx'
import React from 'react'
import { observer } from '../../../../node_modules/mobx-react'
import { Episode } from '../../../store/episode'
import { TextButton } from '../../button'
import { Spinner } from '../../spinner'

type Props = {
  episode: Episode
}

class WatchedButtonComponent extends React.Component<Props> {
  @observable loading = false

  markAsWatched = () => {
    this.setLoading(true)
    this.props.episode
      .markAsWatched()
      .subscribe(() => this.setLoading(false), () => this.setLoading(false))
  }

  markAsUnWatched = () => {
    this.setLoading(true)
    this.props.episode
      .markAsUnwatched()
      .subscribe(() => this.setLoading(false), () => this.setLoading(false))
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading
  }

  render() {
    if (this.loading) {
      return <Spinner size={14} style={{ alignSelf: 'flex-end' }} />
    } else if (this.props.episode.hasWatchedEpisode) {
      return (
        <TextButton onClick={this.markAsUnWatched}>
          Mark as unwatched
        </TextButton>
      )
    } else if (this.props.episode.hasValidAirDate) {
      return (
        <TextButton onClick={this.markAsWatched}>Mark as watched 📺</TextButton>
      )
    } else {
      return null
    }
  }
}

export const WatchedButton = observer(WatchedButtonComponent)
