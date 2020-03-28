import { Dragonstone } from '@episodehunter/types'
import { gql } from '@episodehunter/utils'
import Fuse, { FuseOptions } from 'fuse.js'
import { request } from 'graphql-request'
import { config } from '../config'
import { GetTitlesQuery } from '../dragonstone'

const fuseOptions: FuseOptions<any> = {
  keys: ['name'],
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.6,
  distance: 100,
  includeScore: true,
}

type CutomFuseOptions = typeof fuseOptions
interface ReponseData {
  fetchStatus: 'loaded' | 'loading' | 'error' | 'not loaded'
  result: Dragonstone.Title[]
  error?: Error
}
const returnData = (data: ReponseData) => {
  ;(self.postMessage as any)(data)
}

const titlesQuery = gql`
  query GetTitles {
    titles {
      id
      name
      followers
      tvdbId
    }
  }
`

let fetchingFuse: Promise<Fuse<Dragonstone.Title, CutomFuseOptions>> | null = null

function getFuse() {
  if (fetchingFuse) {
    return fetchingFuse
  }
  returnData({
    fetchStatus: 'loading',
    result: [],
  })
  fetchingFuse = request<GetTitlesQuery>(config.dragonstoneUrl, titlesQuery)
    .then(result => result.titles)
    .then(titles => new Fuse<Dragonstone.Title, CutomFuseOptions>(titles as any, fuseOptions))
    .catch(error => {
      console.error(error)
      returnData({
        fetchStatus: 'error',
        error,
        result: [],
      })
      return new Fuse<Dragonstone.Title, CutomFuseOptions>([], fuseOptions)
    })
  return fetchingFuse
}

function search(fuse: Fuse<Dragonstone.Title, CutomFuseOptions>, searchWord: string) {
  return fuse
    .search<Dragonstone.Title, true, false>(searchWord)
    .map(searchResult => {
      searchResult.score =
        (1 - searchResult.score) * 10 + Math.min(Math.log10(searchResult.item.followers + 10), 20)
      return searchResult
    })
    .sort((a, b) => b.score - a.score)
    .map(a => a.item)
    .slice(0, 20)
}

let currectSearchWord = ''

self.addEventListener('message', async event => {
  const type = event.data.type
  if (type === 'search') {
    currectSearchWord = event.data.data

    const fuse = await getFuse()
    if (currectSearchWord) {
      const result = search(fuse, currectSearchWord)
      returnData({
        fetchStatus: 'loaded',
        result: result,
      })
      currectSearchWord = ''
    }
  }
})
