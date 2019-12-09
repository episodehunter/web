import { DataProxy } from 'apollo-cache'
import produce from 'immer'
import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  GetFollowingShowsDocument,
  GetFollowingShowsQuery,
  GetFollowingShowsQueryVariables,
  GetShowDocument,
  GetShowQuery,
  GetShowQueryVariables,
  useFollowShowMutation,
  useUnfollowShowMutation,
  GetUpcomingQuery,
  GetUpcomingQueryVariables,
  GetUpcomingDocument,
  GetUpcomingShowDocument,
  GetUpcomingShowQueryVariables,
  GetUpcomingShowQuery
} from '../../dragonstone'
import { Show } from '../../types/show'
import { Button } from '../atoms/button'
import { ApolloClient } from 'apollo-boost'

interface Props {
  show: Show
}

export const FollowingButton = ({ show }: Props) => {
  const { followShow, unfollowShow, loading } = useFollowMutation(show)

  if (show.isFollowing) {
    return (
      <Button type="outlined" progress={loading} onClick={() => unfollowShow()}>
        Unfollow
      </Button>
    )
  } else {
    return (
      <Button type="secondary" progress={loading} onClick={() => followShow()}>
        Follow
      </Button>
    )
  }
}

type FollowingState = 'Following' | 'NotFollowing'

function useFollowMutation(show: Show) {
  const client = useApolloClient()
  const [followShow, { loading: followLoading }] = useFollowShowMutation({
    update(cache) {
      updateFollowingStatusForShowInCache(cache, show, 'Following')
      updateFollowingListInCache(cache, client, show, 'Following')
    },
    variables: {
      showId: show.ids.id
    }
  })
  const [unfollowShow, { loading: unfollowLoading }] = useUnfollowShowMutation({
    update(cache) {
      updateFollowingStatusForShowInCache(cache, show, 'NotFollowing')
      updateFollowingListInCache(cache, client, show, 'NotFollowing')
    },
    variables: {
      showId: show.ids.id
    }
  })

  const loading = followLoading || unfollowLoading

  return { followShow, unfollowShow, loading }
}

function updateFollowingStatusForShowInCache(
  cache: DataProxy,
  show: Show,
  nextState: FollowingState
) {
  const cacheShow = cache.readQuery<GetShowQuery, GetShowQueryVariables>({
    query: GetShowDocument,
    variables: { id: show.ids.id }
  })
  if (!cacheShow) {
    return
  }
  cache.writeQuery({
    data: produce(cacheShow, draft => {
      draft.show!.followers += nextState === 'Following' ? 1 : -1
      draft.show!.isFollowing = nextState === 'Following'
    }),
    query: GetShowDocument,
    variables: { id: show.ids.id }
  })
}

async function updateFollowingListInCache(
  cache: DataProxy,
  client: ApolloClient<object>,
  show: Show,
  nextState: FollowingState
) {
  let cacheFollowingList: GetFollowingShowsQuery | null = null
  let cacheUpcomingList: GetUpcomingQuery | null = null
  try {
    cacheFollowingList = cache.readQuery<GetFollowingShowsQuery, GetFollowingShowsQueryVariables>({
      query: GetFollowingShowsDocument
    })
  } catch {}
  try {
    cacheUpcomingList = cache.readQuery<GetUpcomingQuery, GetUpcomingQueryVariables>({
      query: GetUpcomingDocument
    })
  } catch {}

  if (cacheFollowingList) {
    cache.writeQuery({
      data: produce(cacheFollowingList, draft => {
        if (nextState === 'Following') {
          draft.following.push({
            __typename: 'Following',
            show: {
              __typename: 'Show',
              ids: show.ids,
              name: show.name,
              nextToWatch: show.nextToWatch
            }
          })
        } else {
          draft.following = draft.following.filter(f => f.show.ids.id !== show.ids.id)
        }
      }),
      query: GetFollowingShowsDocument
    })
  }
  if (cacheUpcomingList) {
    if (nextState === 'NotFollowing') {
      cache.writeQuery({
        data: produce(cacheUpcomingList, draft => {
          draft.following = draft.following.filter(f => f.show.ids.id !== show.ids.id)
        }),
        query: GetUpcomingDocument
      })
    } else {
      const upcoming = await client.query<GetUpcomingShowQuery, GetUpcomingShowQueryVariables>({
        query: GetUpcomingShowDocument,
        variables: { id: show.ids.id }
      })
      if (!upcoming.data.show) {
        return
      }
      cache.writeQuery({
        data: produce(cacheUpcomingList, draft => {
          draft.following.push({
            __typename: 'Following',
            show: upcoming.data.show as NonNullable<typeof upcoming.data.show>
          })
        }),
        query: GetUpcomingDocument
      })
    }
  }
}
