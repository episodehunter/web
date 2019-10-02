import { Dragonstone } from '@episodehunter/types'
import { gql } from '@episodehunter/utils'
import Fuse, { FuseOptions } from 'fuse.js'
import { request } from 'graphql-request'
import { dragonstoneUrl } from '../config'
import { GetTitlesQuery } from '../dragonstone'

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

let fetchingFuse: Promise<Fuse<{ item: Dragonstone.Title; score: number }>> | null = null

function getFuse() {
  if (fetchingFuse) {
    return fetchingFuse
  }
  fetchingFuse = request<GetTitlesQuery>(dragonstoneUrl, titlesQuery)
    .then(result => result.titles)
    .then(
      titles => new Fuse<{ item: Dragonstone.Title; score: number }>(titles as any, fuseOptions)
    )
    .catch(error => {
      console.error(error)
      return new Fuse<{ item: Dragonstone.Title; score: number }>([], fuseOptions)
    })
  return fetchingFuse
}

function search(fuse: Fuse<{ item: Dragonstone.Title; score: number }>, searchWord: string) {
  return fuse
    .search(searchWord)
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
  if (type === 'fetch') {
    return getFuse()
  } else if (type === 'search') {
    currectSearchWord = event.data.data

    const fuse = await getFuse()
    if (currectSearchWord) {
      const result = search(fuse, currectSearchWord)
      returnData({
        fetchStatus: null,
        result: result
      })
      currectSearchWord = ''
    }
  }
})
