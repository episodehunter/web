import { RootSore } from '../../store/root-store'
import { Fetcher } from '../fetcher'

export const createShowLoader = ({ shows, showPage }: RootSore, { showFetcher }: Fetcher) => ({
  async loadShowForShowPage(showId: string) {
    showPage.showId = showId
    if (shows.has(showId)) {
      showPage.loadingState.setLoaded()
      return
    }
    showPage.loadingState.setLoading()
    const show = await showFetcher.fetchShow([showId])
    shows.add(show[0])
    showPage.loadingState.setLoaded()
    return
  }
})
