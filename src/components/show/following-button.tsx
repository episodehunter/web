import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { Following } from '../../store/following'
import { Show } from '../../store/show'
import { composeHOC } from '../../utils/function.util'
import { Button } from '../button'
import { Spinner } from '../spinner'

type Props = {
  show: Show
  following?: Following
}

class FollowingButtonComponent extends React.Component<Props> {
  @observable
  updating = false

  @action
  setUpdating(isUpdating: boolean) {
    this.updating = isUpdating
  }

  followShow() {
    this.setUpdating(true)
    this.props
      .following!.follow(this.props.show.id)
      .subscribe(() => this.setUpdating(false), () => this.setUpdating(false))
  }

  unfollowShow() {
    this.setUpdating(true)
    this.props
      .following!.unfollow(this.props.show.id)
      .subscribe(() => this.setUpdating(false), () => this.setUpdating(false))
  }

  render() {
    if (this.updating) {
      return <Spinner />
    } else if (this.props.following!.isFollowingShow(this.props.show.id)) {
      return <Button onClick={() => this.unfollowShow()}>Unfollow</Button>
    } else {
      return <Button onClick={() => this.followShow()}>Follow</Button>
    }
  }
}

export const FollowingButton = composeHOC<Props>(inject('following'), observer)(
  FollowingButtonComponent
)
