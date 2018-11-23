import React from 'react'
import { Subscription } from 'rxjs'
import { followingIds2$ } from '../../utils/firebase/selectors'
import { Button } from '../button'
import { Spinner } from '../spinner'

type Props = {
  showId: string
  // following?: Following
}

type CompState = {
  isFollowing: IsFollowing
}

export class FollowingButton extends React.Component<Props> {
  subscription: Subscription

  state = {
    isFollowing: IsFollowing.unknwon
  } as CompState

  componentDidMount() {
    this.subscription = followingIds2$.subscribe(followingIds => {
      if (!followingIds.data) {
        this.setState({ isFollowing: IsFollowing.unknwon })
      } else {
        const isFollowing = followingIds.data.includes(
          Number(this.props.showId)
        )
          ? IsFollowing.yes
          : IsFollowing.no
        this.setState({ isFollowing })
      }
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  followShow() {
    // this.setUpdating(true)
    // this.props
    //   .following!.follow(this.props.show.id)
    //   .subscribe(() => this.setUpdating(false), () => this.setUpdating(false))
    console.log('Follow show!')
  }

  unfollowShow() {
    // this.setUpdating(true)
    // this.props
    //   .following!.unfollow(this.props.show.id)
    //   .subscribe(() => this.setUpdating(false), () => this.setUpdating(false))
    console.log('Unfollow show!')
  }

  render() {
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

// export const FollowingButton = composeHOC<Props>(inject('following'), observer)(
//   FollowingButtonComponent
// )
