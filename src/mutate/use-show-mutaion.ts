import { action, runInAction } from 'mobx'
import { gql } from '@episodehunter/utils'
import { Show } from '../types/show'
import { GqClient } from '../utils/gq-client'
import { useCallback } from 'react'
import { useGqClient } from '../contexts/global-context'
import {
  FollowShowMutation,
  FollowShowMutationVariables,
  UnfollowShowMutationVariables,
  UnfollowShowMutation
} from '../dragonstone'

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

const followShowMutation = gql`
  mutation FollowShow($showId: Int!) {
    followShow(showId: $showId)
  }
`

const unfollowShowMutation = gql`
  mutation UnfollowShow($showId: Int!) {
    unfollowShow(showId: $showId)
  }
`

async function followShowReq(client: GqClient, showId: number): Promise<boolean> {
  return client<FollowShowMutation, FollowShowMutationVariables>(followShowMutation, {
    showId
  }).then(result => result.followShow)
}

async function unfollowShowReq(client: GqClient, showId: number): Promise<boolean> {
  return client<UnfollowShowMutation, UnfollowShowMutationVariables>(unfollowShowMutation, {
    showId
  }).then(result => result.unfollowShow)
}
