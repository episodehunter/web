import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { useShowMutaion } from '../../mutate/use-show-mutaion'
import { Show } from '../../types/show'
import { Button } from '../button'

interface Props {
  show: Show
}

export const FollowingButton = observer(({ show }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const { followShow, unfollowShow } = useShowMutaion(show)

  const follow = useCallback(() => {
    setDisabled(true)
    followShow()
  }, [])

  const unfollow = useCallback(() => {
    setDisabled(true)
    unfollowShow()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(setDisabled, 2000, false)
    return () => clearTimeout(timeoutId)
  }, [disabled])

  if (show.isFollowing) {
    return (
      <Button disabled={disabled} onClick={unfollow}>
        Unfollow
      </Button>
    )
  } else {
    return (
      <Button disabled={disabled} onClick={follow}>
        Follow
      </Button>
    )
  }
})
