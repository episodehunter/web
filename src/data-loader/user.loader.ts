import { RootSore } from '../store/root-store'
import { Fetcher } from './fetcher'

export const createUserLoader = (
  { following }: RootSore,
  { userFetcher }: Fetcher
) => ({
  async loadFolloingShowsIds() {
    if (following.loadingState.hasLoaded()) {
      return following.folloingShowsIds
    }
    following.loadingState.setLoading()
    const followingList = await userFetcher.fetchFolloingList()
    following.setFollowing(followingList)
    following.loadingState.setLoading()
    return followingList
  }
})
