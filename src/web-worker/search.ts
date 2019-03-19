import Fuse, { FuseOptions } from 'fuse.js'
import { request } from 'graphql-request'
import { dragonstoneUrl } from '../config'
import { PublicTypes } from '../data-loader/public-types'

enum FetchStatus {
  NotStarted,
  Started,
  Completed
}

const fuseOptions: FuseOptions<any> = {
  keys: ['name'],
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.6,
  distance: 100,
  includeScore: true
}

const returnData = (data: any) => {
  ;(self.postMessage as any)(data)
}

let fetchStatus = FetchStatus.Started

const fetchingFuse = request<{ titles: PublicTypes.Title[] }>(
  dragonstoneUrl,
  `{
    titles {
      id
      name
      followers
      tvdbId
    }
  }`
)
  .then(result => result.titles)
  .then(titles => new Fuse<{ item: PublicTypes.Title; score: number }>(titles as any, fuseOptions))
  .catch(error => {
    console.error(error)
    return new Fuse<{ item: PublicTypes.Title; score: number }>([], fuseOptions)
  })

function search(fuse: Fuse<{ item: PublicTypes.Title; score: number }>, searchWord: string) {
  return fuse
    .search(searchWord)
    .map(searchResult => {
      searchResult.score = (1 - searchResult.score) * searchResult.item.followers
      return searchResult
    })
    .sort((a, b) => b.score - a.score)
    .map(a => a.item)
    .slice(0, 20)
}

let currectSearchWord = ''

self.addEventListener('message', async event => {
  if (fetchStatus === FetchStatus.Started) {
    returnData({
      fetchStatus: FetchStatus[fetchStatus],
      result: []
    })
  }

  currectSearchWord = event.data

  const fuse = await fetchingFuse
  if (currectSearchWord) {
    const result = search(fuse, currectSearchWord)
    returnData({
      fetchStatus: FetchStatus[fetchStatus],
      result: result
    })
    currectSearchWord = ''
  }
})
