import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { IsFollowing } from '../../enum/is-following'
import { useUserLoader } from '../../global-context'
import { Button } from '../button'
import { Spinner } from '../spinner'

interface Props {
  isFollowing: IsFollowing
  showId: string
}

export const FollowingButton = observer(({ isFollowing, showId }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const userLoader = useUserLoader()

  const guard = (cb: (showId: string) => void) => () => {
    if (disabled) {
      return
    }
    setDisabled(true)
    setTimeout(setDisabled, 2000, false)
    cb(showId)
  }

  switch (isFollowing) {
    case IsFollowing.yes:
      return (
        <Button disabled={disabled} onClick={guard(userLoader.unfollowShow)}>
          Unfollow
        </Button>
      )
    case IsFollowing.no:
      return (
        <Button disabled={disabled} onClick={guard(userLoader.followShow)}>
          Follow
        </Button>
      )
    default:
      return <Spinner />
  }
})
