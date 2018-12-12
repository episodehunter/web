import React from 'react';
import { Subscription } from 'rxjs';
import { followingIds$ } from '../../utils/firebase/selectors';
import { followShow, unfollowShow } from '../../utils/firebase/util';
import { Button } from '../button';
import { Spinner } from '../spinner';

type Props = {
  showId: string
}

type CompState = {
  isFollowing: IsFollowing
  updatingList: boolean
}

export class FollowingButton extends React.Component<Props> {
  subscription: Subscription
  state = {
    isFollowing: IsFollowing.unknwon,
    updatingList: false
  } as CompState

  componentDidMount() {
    this.subscription = followingIds$.subscribe(followingIds => {
      const isFollowing = followingIds.includes(this.props.showId)
        ? IsFollowing.yes
        : IsFollowing.no
        this.setState({ isFollowing })
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  followShow() {
    this.setState({ updatingList: true })
    followShow(this.props.showId).subscribe(
      () => null,
      error => console.error(error),
      () => {
        this.setState({ updatingList: false })
      }
    )
  }

  unfollowShow() {
    this.setState({ updatingList: true })
    unfollowShow(this.props.showId).subscribe(
      () => null,
      error => console.error(error),
      () => {
        this.setState({ updatingList: false })
      }
    )
  }

  render() {
    if (this.state.updatingList) {
      return <Spinner />
    }
    switch (this.state.isFollowing) {
      case IsFollowing.yes:
        return <Button onClick={() => this.unfollowShow()}>Unfollow</Button>
      case IsFollowing.no:
        return <Button onClick={() => this.followShow()}>Follow</Button>
      default:
        return <Spinner />
    }
  }
}

enum IsFollowing {
  unknwon,
  yes,
  no
}
