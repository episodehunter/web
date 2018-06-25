import { action, observable } from 'mobx'
import { api } from '../api/api'
import { TitlesResponse } from '../api/responses'
import { ModelStatus } from '../enum'
import { TitlesStorageObject, storage } from '../storage'
import { ModelLoader } from '../utils/model-loader.util'

export type Title = {
  id: string
  name: string
  tvdbId: number
}

export class TitlesStore {
  loader = new ModelLoader()
  @observable status: ModelStatus = ModelStatus.notLoaded
  @observable titles: Title[] = []

  @action
  update(titles: TitlesResponse) {
    this.titles = titles
  }

  async fetchTitles(_api = api) {
    this.status = ModelStatus.loading

    try {
      const titlesFromStorage = await storage.titles.get()
      if (titlesFromStorage) {
        this.update(titlesFromStorage.data)
      }
      if (needToUpdate(titlesFromStorage)) {
        const titlesFromApi = await _api.fetchTitles()
        const updatedTitles = await storage.titles.set(titlesFromApi)
        this.update(updatedTitles)
      }
      this.status = ModelStatus.loaded
    } catch (e) {
      this.status = ModelStatus.error
    }
  }
}

function needToUpdate(
  storageTitles: TitlesStorageObject<TitlesResponse>,
  now = Date.now()
) {
  const aWeekAgo = now - 7 * 24 * 60 * 60 * 1000
  return (
    !storageTitles ||
    !storageTitles.data ||
    storageTitles.date.getTime() < aWeekAgo
  )
}
