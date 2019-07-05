import { action, runInAction } from 'mobx'
import { Show } from '../types/show'
import { PgClient } from '../utils/gq-client'
import { useCallback } from 'react'
import { useGqClient } from '../global-context'

interface ShowMutation {
  followShow(): Promise<boolean>
  unfollowShow(): Promise<boolean>
}

export function useShowMutaion(show: Show): ShowMutation {
  const gqClient = useGqClient()

  const followShow = useCallback(() => {
    runInAction(() => {
      show.isFollowing = true
    })
    return followShowReq(gqClient, show.ids.id).catch(
      action(() => {
        show.isFollowing = false
        return false
      })
    )
  }, [show])

  const unfollowShow = useCallback(() => {
    runInAction(() => {
      show.isFollowing = false
    })
    return unfollowShowReq(gqClient, show.ids.id).catch(
      action(() => {
        show.isFollowing = true
        return false
      })
    )
  }, [show])

  return {
    followShow,
    unfollowShow
  }
}

async function followShowReq(client: PgClient, showId: number): Promise<boolean> {
  return client<{ followShow: boolean }>(
    `mutation {
      followShow(showId: ${showId})
    }`
  ).then(result => result.followShow)
}

async function unfollowShowReq(client: PgClient, showId: number): Promise<boolean> {
  return client<{ followShow: boolean }>(
    `mutation {
      unfollowShow(showId: ${showId})
    }`
  ).then(result => result.followShow)
}
